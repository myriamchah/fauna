"use client";

import { Text, Flex } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const FundsUsageCertified = () => {
  const { phase, projects, certifEvents } = useContractContext();

  return (
    <>
      {phase === 3 && (
        <>
          <Text fontSize="36px" fontWeight="700" mb="1rem">
            Certified good usage
          </Text>
          <Text mb="0.5rem">
            We are working on gathering information before certifying anything.
            Also, some funds are planned to be used more or less sooner, so it
            can take time.
          </Text>
          <Flex direction="column" mt="0.5rem">
            {certifEvents.length > 0 &&
              certifEvents.map((event, i) => (
                <Flex gap="2">
                  <Text fontSize="18px" fontWeight="600" key={i}>
                    {projects[event.id].name}
                  </Text>
                  <Text> {event.comment}</Text>
                </Flex>
              ))}
          </Flex>
        </>
      )}
    </>
  );
};

export default FundsUsageCertified;
