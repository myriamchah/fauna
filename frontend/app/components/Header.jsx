"use client";

import { anton } from "../layout";
import { Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <Flex
      px="2rem"
      py="1rem"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      pos="fixed"
      top="0"
      zIndex={2}
    >
      <Text fontSize={40} className={anton.className}>
        FAUNA
      </Text>
      <ConnectButton />
    </Flex>
  );
};

export default Header;
