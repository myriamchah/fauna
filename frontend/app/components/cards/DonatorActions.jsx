"use client";

import { Card, CardBody } from "@chakra-ui/react";
import DonateForm from "../forms/DonateForm";
import VoteForm from "../forms/VoteForm";

const DonatorActions = () => {
  return (
    <Card bg="rgba(246, 222, 117,0.3)" height="inherit" overflowY="auto">
      <CardBody color="white">
        <DonateForm />
        <VoteForm />
      </CardBody>
    </Card>
  );
};

export default DonatorActions;
