"use client";

import { Container, Flex, Heading, Card, CardBody } from "@chakra-ui/react";
import { useUserContext } from "@/app/contexts/userContext";

import DonateForm from "./forms/DonateForm";
import VoteForm from "./forms/VoteForm";
import VotesEnded from "./copies/VotesEnded";
import FundsGranted from "./copies/FundsGranted";
import FundsUsageCertified from "./copies/FundsUsageCertified";
import KPIs from "./contractState/KPIs";
import Phase from "./contractState/Phase";
import ProjectsList from "./contractState/ProjectsList";

const Main = () => {
  const { isOwner, isDonator } = useUserContext();
  return (
    <Container mt="124px" maxW="84vw" height="calc(100vh - 180px)">
      <Flex justifyContent="space-between" alignItems="center" mb="1rem">
        <Heading size="2xl">
          Hello, dear {isOwner && "Admin"} {isDonator && "Donator"}
        </Heading>
        <Flex>
          <KPIs />
        </Flex>
      </Flex>

      <Card
        bg="rgba(246, 222, 117,0.3)"
        height="inherit"
        overflowY="auto"
        width="100%"
      >
        <CardBody color="white">
          <Phase />
          <ProjectsList />
          <DonateForm />
          <VoteForm />
          <VotesEnded />
          <FundsGranted />
          <FundsUsageCertified />
        </CardBody>
      </Card>
    </Container>
  );
};

export default Main;
