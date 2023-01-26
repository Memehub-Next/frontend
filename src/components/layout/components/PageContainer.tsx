import { Flex, FlexProps } from "@chakra-ui/react";

export const PageContainer: React.FC<FlexProps> = (props: FlexProps) => (
  <Flex bg="black" color="white" direction="column" alignItems="center" justifyContent="flex-start" {...props} />
);
