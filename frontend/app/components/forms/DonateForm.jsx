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
          <Text
            fontSize="36px"
            fontWeight="700"
            mb="1rem"
            align="center"
            color="orange.200"
          >
            Donate
          </Text>
          <Text align="center" mb="1rem">
            Wildlife needs you!! <br /> Donate now and we will make sure your
            donation is well used. We select projects carefully and work in
            close collaboration with them in order to make sure the grants are
            used efficiently for wildlife protection purpose.
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
