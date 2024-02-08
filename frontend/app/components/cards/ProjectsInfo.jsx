"use client";

import { Text, Card, CardBody, Heading } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const ProjectInfo = () => {
  const { projects } = useContractContext();

  return (
    <Card bg="rgba(246, 222, 117,0.3)">
      <CardBody color="white">
        <Heading mb="1rem">Curated Projects</Heading>
        {projects.length
          ? projects.map((project) => (
              <>
                <Text fontSize="24px" fontWeight="600">
                  {project.name}
                </Text>
                <Text>{project.desc}</Text>
              </>
            ))
          : "No projects yet"}
      </CardBody>
    </Card>
  );
};

export default ProjectInfo;
