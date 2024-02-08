"use client";

import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { useContractContext } from "../../contexts/contractContext";

const DonateForm = () => {
  const [donation, setDonation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { donate, phase } = useContractContext();

  const onSubmit = () => {
    setIsLoading(true);
    try {
      donate(donation);
      setDonation("");
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
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
          <Center>
            <InputGroup width="30%">
              <InputLeftElement pointerEvents="none">ETH</InputLeftElement>
              <Input
                type="number"
                variant="flushed"
                value={donation}
                onChange={(e) => {
                  setDonation(e.target.value);
                }}
              />
            </InputGroup>
            <Button
              onClick={onSubmit}
              isLoading={isLoading}
              loadingText="Submitting"
              colorScheme="green"
              ml="2"
            >
              Donate!
            </Button>
          </Center>
        </>
      )}
    </>
  );
};

export default DonateForm;
