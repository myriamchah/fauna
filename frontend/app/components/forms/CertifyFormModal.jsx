"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
} from "@chakra-ui/react";

import { useContractContext } from "../../contexts/contractContext";

const CertifyModal = ({ isCertifyModalOpen, onCertifyModalClose }) => {
  const [projectId, setProjectId] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { certifyFundsUsage, projects } = useContractContext();

  const eligibleProjects = projects.filter(
    (project) => project.fundsReceived > 0
  );

  const getProjectId = (p) => {
    return projects.indexOf(
      projects.find((project) => project.name === p.name)
    );
  };

  const onChange = (e) => {
    setProjectId(e.target.value);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await certifyFundsUsage(projectId, comment);
      setComment("");
      setProjectId("");
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isCertifyModalOpen} onClose={onCertifyModalClose}>
      <ModalOverlay />
      <ModalContent color="green.700">
        <ModalHeader>Certify proper usage of funds for a grantee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Project</FormLabel>
            <Select placeholder="Select project" onChange={onChange}>
              {eligibleProjects.length > 0 &&
                eligibleProjects.map((project, i) => (
                  <option key={i} value={getProjectId(project)}>
                    {project.name}
                  </option>
                ))}
            </Select>
            <FormLabel mt="2rem">Comment</FormLabel>
            <Input
              type="textarea"
              rows={3}
              variant="flushed"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <FormHelperText>
              Please specify how the funds have been used.
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="link"
            fontWeight="300"
            mr={3}
            onClick={onCertifyModalClose}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            isLoading={isLoading}
            loadingText="Submitting"
            colorScheme="green"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CertifyModal;
