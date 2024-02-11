"use client";

import { Text, useDisclosure, Collapse } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useContractContext } from "@/app/contexts/contractContext";
import { formatEther } from "viem";

const DonationsList = () => {
  const { donationEvents } = useContractContext();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Text
        fontSize="24px"
        fontWeight="700"
        _hover={{ color: "green.200", cursor: "pointer" }}
        onClick={onToggle}
      >
        See Donations
        <TriangleDownIcon boxSize="0.5em" ml="0.25rem" />
      </Text>
      <Collapse in={isOpen} animateOpacity>
        {donationEvents.length > 0 &&
          donationEvents.reverse().map((event, i) => (
            <Text fontSize="12" key={i}>
              {formatEther(event.amount)} ETH received from {event.address}
            </Text>
          ))}
      </Collapse>
    </>
  );
};

export default DonationsList;
