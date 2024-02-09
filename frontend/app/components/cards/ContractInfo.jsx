"use client";

import { Text, Card, CardBody, Heading } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const humanReadablePhase = (phase) => {
  switch (phase) {
    case 0:
      return "Projects are being curated, and you can donate.";
    case 1:
      return "Votes are open, and you can still donate.";
    case 2:
      return "Votes and donations are over for this round. We will soon proceed with sending the funds!";
    case 3:
      return "Funds have been sent to the grantees! Thank you all for your implication. We will keep you posted!";
  }
};

const ContractInfo = () => {
  const { phase, projects, faunaBalance } = useContractContext();

  return (
    <Card bg="rgba(246, 222, 117,0.3)" height="fit-content">
      <CardBody color="white">
        <Heading mb="1rem">Phase {phase}</Heading>
        <Text mb="0.5rem" fontWeight="600">
          {humanReadablePhase(phase)}
        </Text>
        <Text mb="0.5rem">We have now {projects.length} curated projects.</Text>
        <Text>So far, we have raised {faunaBalance} ETH!</Text>
      </CardBody>
    </Card>
  );
};

export default ContractInfo;
