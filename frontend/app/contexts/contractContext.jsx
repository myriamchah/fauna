import { createContext, useContext, useState, useEffect } from "react";
import { contractAddress, abi } from "../constants/constants";
import { useAccount } from "wagmi";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const [phase, setPhase] = useState(0);
  const [projects, setProjects] = useState([]);
  const [faunaBalance, setFaunaBalance] = useState(0);
  const { address, isConnected } = useAccount();

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
      return balance;
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    checkPhase();
    getProjects();
    getFaunaBalance();
  }, []);

  return (
    <ContractContext.Provider value={{ phase, projects, faunaBalance }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
