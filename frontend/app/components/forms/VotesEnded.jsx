"use client";

import { Text, Heading } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const VotesEnded = () => {
  const { phase } = useContractContext();

  return (
    <>
      {phase === 2 && (
        <>
          <Heading mb="1rem">Votes are closed</Heading>
          <Text mb="0.5rem">
            Thank you all for you participation. Thanks to you, x projects will
            receive the funds shortly.
          </Text>
        </>
      )}
    </>
  );
};

export default VotesEnded;
