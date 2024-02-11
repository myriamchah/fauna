"use client";

import { Flex } from "@chakra-ui/react";
import KPICard from "./KPICard";
import { useContractContext } from "@/app/contexts/contractContext";

const KPIs = () => {
  const { phase, projects, faunaBalance, donationEvents } =
    useContractContext();

  const donators = [];
  const map = new Map();
  for (const event of donationEvents) {
    if (!map.has(event.address)) {
      map.set(event.address, true);
      donators.push(event.address);
    }
  }

  return (
    <Flex gap="4">
      <KPICard title="Curated projects" value={projects.length} />
      <KPICard title="Donators" value={donators.length} />
      <KPICard title="Funds raised" value={faunaBalance} />
    </Flex>
  );
};

export default KPIs;
