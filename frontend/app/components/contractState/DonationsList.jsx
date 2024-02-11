"use client";

import { Text, useDisclosure, Collapse } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
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
        color="orange.200"
        _hover={{ color: "orange.300", cursor: "pointer" }}
        onClick={onToggle}
      >
        Donations
        {isOpen ? (
          <TriangleUpIcon boxSize="0.5em" ml="0.25rem" />
        ) : (
          <TriangleDownIcon boxSize="0.5em" ml="0.25rem" />
        )}
      </Text>
      <Collapse in={isOpen} animateOpacity>
        {donationEvents.length > 0 &&
          donationEvents.reverse().map((event, i) => (
            <Text fontSize="12" key={i} noOfLines={2}>
              {formatEther(event.amount)} ETH received from {event.address}
            </Text>
          ))}
      </Collapse>
    </>
  );
};

export default DonationsList;
