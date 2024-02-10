"use client";

import { Card, CardBody } from "@chakra-ui/react";
import DonateForm from "../forms/DonateForm";
import VoteForm from "../forms/VoteForm";
import VotesEnded from "../forms/VotesEnded";
import FundsGranted from "../forms/FundsGranted";
import FundsUsageCertified from "../forms/FundsUsageCertified";

const DonatorActions = () => {
  return (
    <Card
      bg="rgba(246, 222, 117,0.3)"
      height="inherit"
      overflowY="auto"
      width="100%"
    >
      <CardBody color="white">
        <DonateForm />
        <VoteForm />
        <VotesEnded />
        <FundsGranted />
        <FundsUsageCertified />
      </CardBody>
    </Card>
  );
};

export default DonatorActions;
