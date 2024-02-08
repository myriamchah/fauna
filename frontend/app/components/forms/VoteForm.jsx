"use client";

import { Button, Flex, Text, Heading } from "@chakra-ui/react";
import { useContractContext } from "../../contexts/contractContext";

const VoteForm = () => {
  const { projects, submitVote, hasVoted, votedProjectId } =
    useContractContext();

  const onSubmit = (id) => {
    submitVote(id);
  };

  return (
    <>
      {/* {phase === 1 && isDonator && ( */}
      <>
        <Heading mb="1rem">Vote</Heading>
        <Text>
          We selected a few projects, based on rigorous criteria regarding their
          impact on wildlife, environment but also local populations. You may
          choose one project to which you would like us to send funds. Funds
          will be shared between the projects getting votes.
        </Text>
        {hasVoted ? (
          <Text>
            Thank you, you already voted! (Your vote: {Number(votedProjectId)})
          </Text>
        ) : (
          <Flex direction="column">
            {projects.length &&
              projects.map((project) => (
                <Flex alignItems="center" key={project.id}>
                  <Button
                    colorScheme="green"
                    disabled={hasVoted}
                    // isLoading
                    // loadingText="Submitting"
                    onClick={() => onSubmit(project.id)}
                    m="2"
                  >
                    {project.name}
                  </Button>
                </Flex>
              ))}
          </Flex>
        )}
      </>
      {/* )} */}
    </>
  );
};

export default VoteForm;
