"use client";

import { Text, useDisclosure, Collapse } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useContractContext } from "@/app/contexts/contractContext";

const ProjectsList = () => {
  const { projects } = useContractContext();
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
        Projects list
        {isOpen ? (
          <TriangleUpIcon boxSize="0.5em" ml="0.25rem" />
        ) : (
          <TriangleDownIcon boxSize="0.5em" ml="0.25rem" />
        )}
      </Text>
      <Collapse in={isOpen} animateOpacity>
        {projects.length
          ? projects.map((project) => (
              <>
                <Text fontSize="18px" fontWeight="600" color="yellow.200">
                  ✿ {project.name}
                </Text>
                <Text>{project.desc}</Text>
              </>
            ))
          : "No projects yet"}
      </Collapse>
    </>
  );
};

export default ProjectsList;
