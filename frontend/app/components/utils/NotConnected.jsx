import { Flex, Text } from "@chakra-ui/react";
import { anton } from "../../layout";

const NotConnected = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="80vw"
      mt="4rem"
    >
      <h1 className={`logo-big ${anton.className}`}>FAUNA</h1>
      <Text fontSize="4xl">We bring animal lovers efforts together</Text>
      <Text fontSize="4xl"> to enhance wildlife protection</Text>
      <Text mt="1rem">
        If you would like to contribute and be part of our community, feel free
        to connect your wallet.
      </Text>
      <Text>
        If you're an organization or an association helping animals and would
        like to apply for funding, please reach out to Myriam Chah.
      </Text>
    </Flex>
  );
};

export default NotConnected;
