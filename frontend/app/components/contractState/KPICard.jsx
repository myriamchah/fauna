"use client";

import { Text, Card, CardBody } from "@chakra-ui/react";

const KPICard = ({ title, value }) => {
  return (
    <Card bg="rgba(100, 74, 13,0.4)">
      <CardBody color="white" p="8px">
        <Text fontSize="18px" fontWeight="600" color="orange.200">
          {title}
        </Text>
        <Text fontSize="24px" fontWeight="700" align="end">
          {title.includes("unds") && (
            <span style={{ fontSize: "12px", marginRight: "4px" }}>ETH</span>
          )}
          {value}
        </Text>
      </CardBody>
    </Card>
  );
};

export default KPICard;
