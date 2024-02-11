"use client";

import { Text, Heading } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const Phase = () => {
  const { phase } = useContractContext();

  const phaseName = () => {
    switch (phase) {
      case 0:
        return "Curation of projects";
      case 1:
        return "Votes are open";
      case 2:
        return "Votes are closed";
      case 3:
        return "Funds sent";
    }
  };

  const phaseDescription = () => {
    switch (phase) {
      case 0:
        return "Projects are being curated, and you can donate.";
      case 1:
        return "Votes are open, and you can still donate.";
      case 2:
        return "Votes and donations are over for this round. We will soon proceed with sending the funds!";
      case 3:
        return "Funds have been sent to the grantees! Thank you all for your implication. We will keep you posted!";
    }
  };

  return (
    <>
      <Heading mb="1rem">{phaseName()}</Heading>
      <Text mb="0.5rem" fontWeight="600">
        {phaseDescription()}
      </Text>
    </>
  );
};

export default Phase;
