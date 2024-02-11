"use client";

import { Text, Flex } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const FundsUsageCertified = () => {
  const { phase, projects, certifEvents } = useContractContext();

  return (
    <>
      {phase === 3 && (
        <>
          <Text
            fontSize="36px"
            fontWeight="700"
            my="1rem"
            align="center"
            color="orange.200"
          >
            Follow-up with grantees
          </Text>
          <Text mb="0.5rem" align="center">
            We aim at certifying proper use for the funds that were sent. We are
            in contact with the grantees. Please keep in mind that grantees may
            plan to use the funds more or less sooner, which can add delay.
          </Text>
          <Flex direction="column" alignItems="center" mt="0.5rem">
            {certifEvents.length > 0 &&
              certifEvents.map((event, i) => (
                <Text fontSize="18px" fontWeight="600" key={i}>
                  ✓ {projects[event.id].name} : &nbsp;
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    {event.comment}
                  </span>
                </Text>
              ))}
          </Flex>
        </>
      )}
    </>
  );
};

export default FundsUsageCertified;
