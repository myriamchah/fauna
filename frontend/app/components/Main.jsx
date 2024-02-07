"use client";

import { useState } from "react";
import {
  Container,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { useContractContext } from "../contexts/contractContext";

const Main = () => {
  const { phase, projects, faunaBalance, addCuratedProject } =
    useContractContext();
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

  const onSubmit = () => {
    addCuratedProject(project);
    setProject({
      name: "",
      desc: "",
      address: "",
    });
  };

  return (
    <Container mt="80px" maxW="120ch">
      <Text>Current phase is: {phase}</Text>
      <Text>
        Curated projects:{" "}
        {projects.length && projects.map((project) => project.name)}
      </Text>
      <Text>Fauna Balance: {faunaBalance}</Text>

      <FormControl>
        <FormLabel>Project Name</FormLabel>
        <Input
          type="text"
          value={project.name}
          onChange={(e) => {
            onChange("name", e.target.value);
          }}
        />
        <FormLabel>Project Description</FormLabel>
        <Input
          type="text"
          value={project.desc}
          onChange={(e) => {
            onChange("desc", e.target.value);
          }}
        />
        <FormHelperText>
          Specify how the funds are planned to be used.
        </FormHelperText>
        <FormLabel>Project Address</FormLabel>
        <Input
          type="text"
          value={project.address}
          onChange={(e) => {
            onChange("address", e.target.value);
          }}
        />
        <FormHelperText>
          To which the funds will be send if Project is elected.
        </FormHelperText>
      </FormControl>
      <Button mt={4} onClick={onSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default Main;
