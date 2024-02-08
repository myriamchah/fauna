"use client";

import { Container, Flex, Heading } from "@chakra-ui/react";
import { useUserContext } from "@/app/contexts/userContext";

import ContractInfo from "./cards/ContractInfo";
import ProjectsInfo from "./cards/ProjectsInfo";
import DonatorActions from "./cards/DonatorActions";

const Main = () => {
  const { isOwner, isDonator } = useUserContext();
  return (
    <Container mt="20vh" maxW="120ch" height="70vh">
      <Heading size="3xl" mb="2rem">
        Hello, dear {isOwner && "Admin"} {isDonator && "Donator"}
      </Heading>
      <Flex>
        <Flex direction="column" gap="10">
          <ContractInfo />
          <ProjectsInfo />
        </Flex>
        <Flex>
          <DonatorActions />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Main;
