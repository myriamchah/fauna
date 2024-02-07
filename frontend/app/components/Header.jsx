"use client";

import { anton } from "../layout";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddIcon,
  UnlockIcon,
  LockIcon,
  StarIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useUserContext } from "../contexts/userContext";
import { useContractContext } from "../contexts/contractContext";

import AddProjectModal from "./forms/AddProjectFormModal";

const Header = () => {
  const { isConnected } = useAccount();
  const { isOwner, isDonator } = useUserContext();
  const { startVotes, endVotes, sendFunds } = useContractContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
        {isConnected && isOwner && (
          <Menu>
            <MenuButton fontWeight="600" mr="2rem ">
              Owner actions
              <TriangleDownIcon boxSize="0.5em" ml="0.25rem" />
            </MenuButton>
            <MenuList color="green.700">
              <MenuItem icon={<AddIcon />} onClick={onOpen}>
                Add a project
              </MenuItem>
              <MenuItem icon={<UnlockIcon />} onClick={startVotes}>
                Open Votes
              </MenuItem>
              <MenuItem icon={<LockIcon />} onClick={endVotes}>
                Close Votes
              </MenuItem>
              <MenuItem icon={<StarIcon />} onClick={sendFunds}>
                Send Funds
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        <ConnectButton />
      </Flex>
      <AddProjectModal {...{ isOpen, onOpen, onClose }} />
    </>
  );
};

export default Header;
