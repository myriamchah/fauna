"use client";

import { Text, Flex } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";
import { formatEther } from "viem";

const FundsGranted = () => {
  const { phase, projects, fundsGrantedEvents } = useContractContext();

  return (
    <>
      {phase === 3 && (
        <>
          <Text fontSize="36px" fontWeight="700" mb="1rem">
            Funds have been sent!
          </Text>
          <Text mb="0.5rem">
            Here is the split, based on the donators votes:
          </Text>
          <Flex direction="column" mt="0.5rem">
            {fundsGrantedEvents.length > 0 &&
              fundsGrantedEvents.map((event, i) => (
                <Text key={i}>
                  {formatEther(event.amount)} ETH were sent to{" "}
                  {projects[event.projectId].name}
                </Text>
              ))}
          </Flex>
        </>
      )}
    </>
  );
};

export default FundsGranted;
