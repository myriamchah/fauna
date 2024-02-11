"use client";

import { Text } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const VotesEnded = () => {
  const { phase, projects } = useContractContext();

  const electedProjects = projects.filter((project) => project.voteCount > 0);

  return (
    <>
      {phase === 2 && (
        <>
          <Text
            fontSize="36px"
            fontWeight="700"
            mb="1rem"
            align="center"
            color="orange.200"
          >
            Votes are now closed
          </Text>
          <Text mb="0.5rem" align="center">
            Thank you all for you contributions. Thanks to you,{" "}
            {electedProjects.length} projects will receive the funds shortly.
          </Text>
        </>
      )}
    </>
  );
};

export default VotesEnded;
