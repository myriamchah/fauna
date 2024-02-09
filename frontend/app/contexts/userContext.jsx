import { createContext, useContext, useState, useEffect } from "react";
import { contractAddress, abi } from "../constants/constants";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isDonator, setIsDonator] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedProjectId, setVotedProjectId] = useState("");
  const { address, isConnected } = useAccount();

  const checkOwner = async () => {
    try {
      const owner = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "owner",
      });
      setIsOwner(owner === address);
    } catch (e) {
      console.log(e.message);
    }
  };

  const checkDonator = async () => {
    try {
      const donator = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getDonator",
        args: [address],
      });
      setIsDonator(Number(donator.totalDonated) > 0);
      setHasVoted(donator.hasVoted);
      setVotedProjectId(donator.votedProjectId);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isConnected) {
      checkOwner();
      checkDonator();
    }
  }, [address, isConnected, hasVoted]);

  return (
    <UserContext.Provider
      value={{
        isOwner,
        isDonator,
        hasVoted,
        votedProjectId,
        setHasVoted,
        setVotedProjectId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
