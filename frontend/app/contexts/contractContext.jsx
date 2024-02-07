import { createContext, useContext, useState, useEffect } from "react";
import { contractAddress, abi } from "../constants/constants";
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
  const { address } = useAccount();

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
    } catch (e) {
      console.log(e.message);
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
    } catch (e) {
      console.log(e.message);
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
    } catch (e) {
      console.log(e.message);
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
    } catch (e) {
      console.log(e.message);
    }
  };

  const submitVote = async (id) => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addCuratesubmitVotedProject",
        args: [id],
        account: address,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });
    } catch (e) {
      console.log(e.message);
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
    } catch (e) {
      console.log(e.message);
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
