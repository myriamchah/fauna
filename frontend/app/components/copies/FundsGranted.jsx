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
          <Text
            fontSize="36px"
            fontWeight="700"
            mb="1rem"
            align="center"
            color="orange.200"
          >
            Funds have been sent!
          </Text>
          <Text mb="0.5rem" align="center">
            Here is how funds were split, based on the donators votes:
          </Text>
          <Flex direction="column" mt="0.5rem" alignItems="center">
            {fundsGrantedEvents.length > 0 &&
              fundsGrantedEvents.map((event, i) => (
                <Text fontWeight="600" key={i}>
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
