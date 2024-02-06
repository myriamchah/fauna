import { Spinner, Flex } from "@chakra-ui/react";

const Loader = ({ size, mt }) => (
  <Flex justifyContent="center">
    <Spinner {...{ size, mt }} />
  </Flex>
);

export default Loader;
