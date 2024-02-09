"use client";

import { Text, Heading, Flex } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";
import { formatEther } from "viem";

const FundsGranted = () => {
  const { phase, projects, fundsGrantedEvents } = useContractContext();

  return (
    <>
      {phase === 3 && (
        <>
          <Heading mb="1rem">Funds have been sent!</Heading>
          <Text mb="0.5rem">
            Here is the split, based on the donators votes:
            <Flex direction="column" mt="0.5rem">
              {fundsGrantedEvents.length > 0 &&
                fundsGrantedEvents.map((event, i) => (
                  <Text key={i}>
                    {formatEther(event.amount)} ETH were sent to{" "}
                    {projects[event.projectId].name}
                  </Text>
                ))}
            </Flex>
          </Text>
        </>
      )}
    </>
  );
};

export default FundsGranted;
