"use client";

import { Text, Heading } from "@chakra-ui/react";
import { useContractContext } from "@/app/contexts/contractContext";

const ProjectsList = () => {
  const { projects } = useContractContext();

  return (
    <>
      <Heading mb="1rem">Projects</Heading>
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
    </>
  );
};

export default ProjectsList;
