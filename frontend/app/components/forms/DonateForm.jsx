"use client";

import { useState } from "react";
import { Button, Input, Flex, Heading, Text } from "@chakra-ui/react";
import { useContractContext } from "../../contexts/contractContext";

const DonateForm = () => {
  const [donation, setDonation] = useState("");
  const { donate, phase } = useContractContext();

  const onSubmit = () => {
    donate(donation);
    setDonation("");
  };

  return (
    <>
      {phase < 2 && (
        <>
          <Heading mb="1rem">Donate</Heading>
          <Text>
            Wildlife needs you!! Donate now and we will make sure your donation
            is well used and will help animals live a better life.
          </Text>
          <Flex gap="2">
            <Input
              type="number"
              variant="flushed"
              value={donation}
              onChange={(e) => {
                setDonation(e.target.value);
              }}
            />
            <Button
              onClick={onSubmit}
              // isLoading
              // loadingText="Submitting"
              colorScheme="green"
            >
              Donate!
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};

export default DonateForm;
