"use client";

import { anton } from "../layout";
import { Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useUserContext } from "../contexts/userContext";

const Header = () => {
  const { isConnected } = useAccount();
  const { isOwner, isDonator } = useUserContext();

  return (
    <Flex
      px="2rem"
      py="1rem"
      justifyContent={isConnected ? "space-between" : "flex-end"}
      alignItems="center"
      width="100%"
      pos="fixed"
      top="0"
      zIndex={2}
    >
      {isConnected && (
        <>
          <Text fontSize={40} className={anton.className}>
            FAUNA
          </Text>
          <Text>{isOwner && "Owner"}</Text>
          <Text>{isDonator && "Donator"}</Text>
        </>
      )}
      <ConnectButton />
    </Flex>
  );
};

export default Header;
