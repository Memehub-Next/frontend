import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { nextUrqlClient } from "src/graphql/urql-client/nextUrqlClient";
import { ssrExchange } from "urql";
import { DoubleColLayout } from "../components/layout/doubleColLayout";
import { ImageWrapper } from "../components/misc/ImageWrapper";
import { BetForm } from "../components/RedditBets/BetForm";
import { BetResultMenu } from "../components/RedditBets/BetResultMenu";
import {
  ELeaderboard,
  LeaderboardDocument,
  LeaderboardQuery,
  LeaderboardQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  useRandomRedditMemesQuery,
} from "../graphql/urql-codegen";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
    if (!client) throw new Error("where URQL client?");
    await client.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
    for (const eLeaderboard of Object.values(ELeaderboard))
      await client.query<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, { eLeaderboard, take: 3, skip: 0 }).toPromise();
    // await client.query<RandomRedditMemesQuery, RandomRedditMemesQueryVariables>(RandomRedditMemesDocument, { take: 10 }).toPromise();
    return { props: { urqlState: ssrCache.extractData() } };
  } catch (error) {
    console.error(error);
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }
};

const Page: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [RandomRedditMemesResp, randomRedditMemesRefetch] = useRandomRedditMemesQuery({ variables: { take: 10 } });
  const redditMemes = RandomRedditMemesResp.data?.randomRedditMemes || [undefined];
  const currentMeme = redditMemes[index];
  return (
    <DoubleColLayout>
      <HStack w="100%" align="flex-start" px={2}>
        <VStack w="100%" p={2}>
          <Button
            size="xs"
            onClick={() =>
              setIndex((i) => {
                if (i !== 9) return i + 1;
                randomRedditMemesRefetch({ requestPolicy: "network-only" });
                return 0;
              })
            }
          >
            <HStack>
              <Text>Next</Text>
              <BiRightArrowAlt />
            </HStack>
          </Button>
          <Text noOfLines={1} textAlign="center">
            {currentMeme?.title}
          </Text>
          <ImageWrapper
            isLoaded={Boolean(redditMemes[index])}
            skeleton={{ w: "15rem", h: "15rem" }}
            _hover={{ cursor: "pointer" }}
            px={2}
            maxH="60vh"
            src={currentMeme?.url}
          />
        </VStack>
        {currentMeme?.redditBet ? (
          <BetResultMenu size="xs" redditBet={currentMeme?.redditBet} />
        ) : (
          <BetForm redditMemeId={currentMeme?.id ?? ""} />
        )}
      </HStack>
    </DoubleColLayout>
  );
};
export default withUrqlClient(nextUrqlClient)(Page);
