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
} from "@chakra-ui/react";
import { useContractContext } from "../../contexts/contractContext";

const addProjectFormModal = ({
  isAddProjectModalOpen,
  onAddProjectModalClose,
}) => {
  const { addCuratedProject } = useContractContext();
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState({
    name: "",
    desc: "",
    address: "",
  });

  const onChange = (elem, text) => {
    setProject((prevState) => ({
      ...prevState,
      [elem]: text,
    }));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await addCuratedProject(project);
      setProject({
        name: "",
        desc: "",
        address: "",
      });
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isAddProjectModalOpen} onClose={onAddProjectModalClose}>
      <ModalOverlay />
      <ModalContent color="green.700">
        <ModalHeader>Add a new curated project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              variant="flushed"
              value={project.name}
              onChange={(e) => {
                onChange("name", e.target.value);
              }}
            />
            <FormLabel mt="2rem">Description</FormLabel>
            <Input
              type="textarea"
              rows={3}
              variant="flushed"
              value={project.desc}
              onChange={(e) => {
                onChange("desc", e.target.value);
              }}
            />
            <FormHelperText>
              Please specify how the funds are planned to be used.
            </FormHelperText>
            <FormLabel mt="2rem">Wallet Address</FormLabel>
            <Input
              type="text"
              variant="flushed"
              value={project.address}
              onChange={(e) => {
                onChange("address", e.target.value);
              }}
            />
            <FormHelperText>
              Where the funds will be sent if Project is elected.
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="link"
            fontWeight="300"
            mr={3}
            onClick={onAddProjectModalClose}
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

export default addProjectFormModal;
