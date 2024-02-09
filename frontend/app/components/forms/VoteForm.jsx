"use client";

import { useState } from "react";
import { Button, Flex, Text, Heading, Center } from "@chakra-ui/react";
import { useContractContext } from "../../contexts/contractContext";
import { useUserContext } from "@/app/contexts/userContext";

const VoteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { hasVoted, votedProjectId } = useUserContext();
  const { phase, projects, submitVote } = useContractContext();

  const onSubmit = (id) => {
    setIsLoading(true);
    try {
      submitVote(id);
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {phase === 1 && isDonator && (
        <>
          <Heading my="1rem">Vote</Heading>
          <Text>
            We selected a few projects, based on rigorous criteria regarding
            their impact on wildlife, environment but also local populations.
            You may choose one project to which you would like us to send funds.
            Funds will be shared between the projects getting at least 1 votes.
          </Text>
          {hasVoted ? (
            <Center mt="2rem">
              Thank you, you already voted! (For:
              {votedProjectId && projects[votedProjectId].name})
            </Center>
          ) : (
            <Flex>
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
