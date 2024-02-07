"use client";

import { Container, Text } from "@chakra-ui/react";
import { useContractContext } from "../contexts/contractContext";

const Main = () => {
  const { phase, projects, faunaBalance } = useContractContext();

  return (
    <Container mt="80px" maxW="120ch">
      <Text>Current phase is: {phase}</Text>
      <Text>
        Curated projects:{" "}
        {projects.length && projects.map((project) => project.name)}
      </Text>
      <Text>Fauna Balance: {faunaBalance}</Text>
    </Container>
  );
};

export default Main;
