"use client";

import { Text, Heading } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const FundsSent = () => {
  const { phase } = useContractContext();

  return (
    <>
      {phase === 3 && (
        <>
          <Heading mb="1rem">Funds have been sent!</Heading>
          <Text mb="0.5rem">
            Here is how the funds have been split among elected Projects:
          </Text>
        </>
      )}
    </>
  );
};

export default FundsSent;
