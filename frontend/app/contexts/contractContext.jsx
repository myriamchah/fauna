import { createContext, useContext, useState, useEffect } from "react";
import { contractAddress, abi } from "../constants/constants";
import useToast from "../hooks/useToast";
import { useAccount } from "wagmi";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { parseEther, formatEther } from "viem";

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const [phase, setPhase] = useState(0);
  const [projects, setProjects] = useState([]);
  const [faunaBalance, setFaunaBalance] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedProjectId, setVotedProjectId] = useState("");
  const { address } = useAccount();
  const toast = useToast();

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
      await getFaunaBalance();
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
        "You started voting session, and won't be able to add new projects since now."
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
    } catch (e) {
      toast.showError(e.message);
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

  useEffect(() => {
    checkPhase();
    getProjects();
    getFaunaBalance();
  }, [address]);

  return (
    <ContractContext.Provider
      value={{
        phase,
        projects,
        faunaBalance,
        hasVoted,
        votedProjectId,
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
