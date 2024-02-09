import { createContext, useContext, useState, useEffect } from "react";
import { contractAddress, abi } from "../constants/constants";
import useToast from "../hooks/useToast";
import { useAccount } from "wagmi";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getPublicClient,
} from "@wagmi/core";
import { parseEther, formatEther, parseAbiItem } from "viem";
import { useUserContext } from "./userContext";

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const [phase, setPhase] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [faunaBalance, setFaunaBalance] = useState(0);
  const [donationEvents, setDonationEvents] = useState([]);
  const [fundsGrantedEvents, setFundsGrantedEvents] = useState([]);

  const { setHasVoted, setVotedProjectId } = useUserContext();
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const client = getPublicClient();

  const checkPhase = async () => {
    try {
      const phase = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "phase",
      });
      setPhase(phase);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getProjects = async () => {
    try {
      const projects = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getProjects",
      });
      setProjects(projects);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getTotalVotes = async () => {
    try {
      const votes = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "totalVotes",
      });
      setTotalVotes(votes);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getFaunaBalance = async () => {
    try {
      const balance = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getBalanceOfFunds",
      });
      setFaunaBalance(formatEther(balance));
    } catch (e) {
      console.log(e.message);
    }
  };

  const addCuratedProject = async (project) => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addCuratedProject",
        args: [project.name, project.desc, project.address],
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      await getProjects();
      toast.showSuccess("The new project has been added, thank you.");
    } catch (e) {
      toast.showError(e.message);
    }
  };

  const donate = async (amount) => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "donate",
        value: parseEther(amount),
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      await getFaunaBalance();
      await getDonationEvents();
      toast.showSuccess(
        "Thank you for your donation! We're looking forward to your vote to help a project fighting for wildlife protection :)"
      );
    } catch (e) {
      toast.showError(e.message);
    }
  };

  const sendFunds = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "sendFunds",
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      await getFundsGrantedEvents();
      toast.showSuccess("All funds have been sent to grantees!");
    } catch (e) {
      toast.showError(e.message);
    }
  };

  const startVotes = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "startVotes",
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      await checkPhase();
      toast.showSuccess(
        "You started voting session, and won't be able to add new projects from now on."
      );
    } catch (e) {
      toast.showError(e.message);
    }
  };

  const submitVote = async (id) => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "submitVote",
        args: [id],
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      toast.showSuccess("Thank you! Your vote has been received.");
      setHasVoted(true);
      setVotedProjectId(id);
      await getTotalVotes();
    } catch (e) {
      toast.showError(e.message);
      setHasVoted(false);
      setVotedProjectId("");
    }
  };

  const endVotes = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "endVotes",
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
      await checkPhase();
      toast.showSuccess(
        "Voting session ended, you may now send funds to elected projects."
      );
    } catch (e) {
      toast.showError(e.message);
    }
  };

  const getDonationEvents = async () => {
    const donationLogs = await client.getLogs({
      event: parseAbiItem(
        "event DonationReceived(address account, uint amount)"
      ),
      fromBlock: 0n,
      toBlock: "latest",
    });
    setDonationEvents(
      donationLogs.map((log) => ({
        address: log.args.account,
        amount: log.args.amount,
      }))
    );
  };

  const getFundsGrantedEvents = async () => {
    const fundsGrantedLogs = await client.getLogs({
      event: parseAbiItem("event FundsGranted(uint amount, uint projectId)"),
      fromBlock: 0n,
      toBlock: "latest",
    });
    setFundsGrantedEvents(
      fundsGrantedLogs.map((log) => ({
        amount: log.args.amount,
        projectId: log.args.projectId,
      }))
    );
  };

  const getAllEvents = async () => {
    await getDonationEvents();
    await getFundsGrantedEvents();
  };

  useEffect(() => {
    if (isConnected) {
      checkPhase();
      getProjects();
      getFaunaBalance();
      getTotalVotes();
      getAllEvents();
    }
  }, [address]);

  return (
    <ContractContext.Provider
      value={{
        phase,
        projects,
        totalVotes,
        faunaBalance,
        donationEvents,
        fundsGrantedEvents,
        addCuratedProject,
        donate,
        sendFunds,
        startVotes,
        submitVote,
        endVotes,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
