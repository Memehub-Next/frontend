import { Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { SingleColLayout } from "../../components/layout/singleColLayout";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";

const Page: NextPage = () => {
  return (
    <SingleColLayout>
      <VStack w="100%" spacing={3}>
        <Text>Mobile App Coming Soon</Text>
      </VStack>
    </SingleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient, { ssr: true })(Page);
