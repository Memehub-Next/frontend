import { Center } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";

export const loader = (
  <Center>
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
  </Center>
);
