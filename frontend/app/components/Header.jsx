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
  const { isOwner } = useUserContext();
  const {
    phase,
    projects,
    faunaBalance,
    totalVotes,
    startVotes,
    endVotes,
    sendFunds,
  } = useContractContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        px="2rem"
        py={isConnected ? "0" : "0.75rem"}
        justifyContent={isConnected ? "space-between" : "flex-end"}
        alignItems="center"
        width="100%"
        pos="fixed"
        top="0"
        zIndex={2}
        bgColor={isConnected ? "#172B20" : "transparent"}
      >
        {isConnected && (
          <Text fontSize={40} className={anton.className}>
            FAUNA
          </Text>
        )}
        <Flex>
          {isConnected && isOwner && (
            <Menu>
              <MenuButton fontWeight="600" mr="2rem ">
                Owner actions
                <TriangleDownIcon boxSize="0.5em" ml="0.25rem" />
              </MenuButton>
              <MenuList color="green.700">
                <MenuItem
                  icon={<AddIcon />}
                  onClick={onOpen}
                  isDisabled={phase != 0}
                >
                  Add a project
                </MenuItem>
                <MenuItem
                  icon={<UnlockIcon />}
                  onClick={startVotes}
                  isDisabled={phase != 0 || projects.length === 0}
                >
                  Open Votes
                </MenuItem>
                <MenuItem
                  icon={<LockIcon />}
                  onClick={endVotes}
                  isDisabled={totalVotes === 0 || phase != 1}
                >
                  Close Votes
                </MenuItem>
                <MenuItem
                  icon={<StarIcon />}
                  onClick={sendFunds}
                  isDisabled={faunaBalance === 0 || phase != 2}
                >
                  Send Funds
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          <ConnectButton />
        </Flex>
      </Flex>
      <AddProjectModal {...{ isOpen, onOpen, onClose }} />
    </>
  );
};

export default Header;
