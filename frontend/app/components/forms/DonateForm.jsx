"use client";

import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Center,
} from "@chakra-ui/react";

import { useContractContext } from "../../contexts/contractContext";

const DonateForm = () => {
  const [donation, setDonation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { donate, phase } = useContractContext();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await donate(donation);
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
          <Text fontSize="36px" fontWeight="700" mb="1rem">
            Donate
          </Text>
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
