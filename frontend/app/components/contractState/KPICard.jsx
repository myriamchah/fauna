"use client";

import { Text, Card, CardBody } from "@chakra-ui/react";

const KPICard = ({ title, value }) => {
  return (
    <Card bg="rgba(246, 222, 117,0.3)">
      <CardBody color="white" p="8px">
        <Text fontSize="18px" fontWeight="600" mb="">
          {title}
        </Text>
        <Text fontSize="24px" fontWeight="700" align="end">
          {title === "Funds raised" && (
            <span style={{ fontSize: "12px", marginRight: "4px" }}>ETH</span>
          )}
          {value}
        </Text>
      </CardBody>
    </Card>
  );
};

export default KPICard;
