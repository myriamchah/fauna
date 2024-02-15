"use client";

import { Container, Flex, Text, Card, CardBody } from "@chakra-ui/react";
import { useUserContext } from "@/app/contexts/userContext";

import DonateForm from "./forms/DonateForm";
import VoteForm from "./forms/VoteForm";
import VotesEnded from "./copies/VotesEnded";
import FundsGranted from "./copies/FundsGranted";
import FundsUsageCertified from "./copies/FundsUsageCertified";
import KPIs from "./contractState/KPIs";
import Phase from "./contractState/Phase";
import ProjectsList from "./contractState/ProjectsList";
import DonationsList from "./contractState/DonationsList";

const Main = () => {
  const { isOwner, isDonator } = useUserContext();
  return (
    <Container
      mt="124px"
      maxW="84vw"
      height="calc(100vh - 180px)"
      overflowY="auto"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="1rem">
        <Text fontSize="48px" fontWeight="800">
          Hello, dear {isOwner && "admin"}{" "}
          {isDonator ? "donator" : !isOwner && "visitor"}
        </Text>
        <Flex>
          <KPIs />
        </Flex>
      </Flex>
      <Flex gap="4">
        <Card bg="rgba(100, 74, 13,0.4)" minH="60vh" flex="1">
          <CardBody color="white">
            <Text fontSize="36px" fontWeight="700" mb="1rem" color="orange.200">
              What's up?
            </Text>
            <Phase />
            <ProjectsList />
            <DonationsList />
          </CardBody>
        </Card>
        <Card bg="rgba(100, 74, 13,0.4)" minH="inherit" flex="3">
          <CardBody color="white">
            <DonateForm />
            <VoteForm />
            <VotesEnded />
            <FundsGranted />
            <FundsUsageCertified />
          </CardBody>
        </Card>
      </Flex>
    </Container>
  );
};

export default Main;
