import { Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { DoubleColLayout } from "../components/layout/doubleColLayout";
import { nextUrqlClient } from "../graphql/urql-client/nextUrqlClient";

const Page: NextPage = () => (
  <DoubleColLayout>
    <Center>
      <VStack maxW={{ base: "90%", lg: "60%" }}>
        <Text>Welcome to Memehub</Text>
        <Text>
          The overall goal is a fun game of memes. On the app you can bet on whether reddit thought a meme was good or bad. Memes are
          scraped from reddit then ranked and assigned a percentile over a one month timeframe. You can then bet long, or short, with Good
          Boy Point (GBP) on a meme with a target percentile. If you yolo your entire stack then you get a 2x multipler! Beware that
          shorting is dangerous just as it is in real life.
        </Text>
        <Text>The app is only compatible with the Hive Blockchain and login with hive key chain.</Text>
        <Flex w="100%" justifyContent="space-around" alignItems="center">
          <Button size="xs" variant="icon" as={Link} href="https://peakd.com/register" target="blank">
            Get Hive Acct
          </Button>
          <Button size="xs" variant="icon" as={Link} href="https://hive-keychain.com/" target="blank">
            Install Hive Keychain
          </Button>
          <Text>Join us on discord</Text>
        </Flex>
      </VStack>
    </Center>
  </DoubleColLayout>
);
export default withUrqlClient(nextUrqlClient, { ssr: true })(Page);
