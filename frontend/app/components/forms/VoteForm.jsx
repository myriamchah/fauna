"use client";

import { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useContractContext } from "../../contexts/contractContext";
import { useUserContext } from "@/app/contexts/userContext";

const VoteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isDonator, hasVoted, votedProjectId } = useUserContext();
  const { phase, projects, submitVote } = useContractContext();

  const onSubmit = async (id) => {
    setIsLoading(true);
    try {
      await submitVote(id);
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {phase === 1 && isDonator && (
        <>
          <Text
            fontSize="36px"
            fontWeight="700"
            my="1rem"
            color="orange.200"
            align="center"
          >
            Vote
          </Text>
          <Text align="center" mb="1rem">
            We selected a few projects, based on rigorous criteria regarding
            their impact on wildlife, environment but also local populations.
            You may choose one project to which you would like us to send funds.
            Funds will be shared between the projects getting at least 1 votes.
          </Text>
          {hasVoted ? (
            <Text align="center" fontWeight="600">
              Thank you, you already voted! (For: &nbsp;
              {votedProjectId >= 0 && projects[votedProjectId].name})
            </Text>
          ) : (
            <Flex justifyContent="center">
              {projects.length > 0 &&
                projects.map((project, i) => (
                  <Flex alignItems="center" key={i}>
                    <Button
                      colorScheme="green"
                      disabled={hasVoted || isLoading}
                      isLoading={isLoading}
                      loadingText="Submitting"
                      onClick={() => onSubmit(i)}
                      m="2"
                    >
                      {project.name}
                    </Button>
                  </Flex>
                ))}
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default VoteForm;
