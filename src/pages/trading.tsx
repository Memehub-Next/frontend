import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { BiRightArrowAlt } from "react-icons/bi";
import { nextUrqlClient } from "src/graphql/urql-client/nextUrqlClient";
import { DoubleColLayout } from "../components/layout/doubleColLayout";
import { ELayout, getServerSideLayoutProps } from "../components/layout/getServerSideLayoutProps";
import { ImageWrapper } from "../components/misc/ImageWrapper";
import { BetForm } from "../components/RedditBets/BetForm";
import { BetResultMenu } from "../components/RedditBets/BetResultMenu";
import {
  RandomRedditMemesDocument,
  RandomRedditMemesQuery,
  RandomRedditMemesQueryVariables,
  RedditMemeCountDocument,
  RedditMemeCountQuery,
  RedditMemeCountQueryVariables,
  useRandomRedditMemesQuery,
} from "../graphql/urql-codegen";

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userAgent = ctx.req.headers["user-agent"] as string;
  const { isMobile } = getSelectorsByUserAgent(userAgent);
  if (isMobile) return { redirect: { permanent: false, destination: "/about/mobile" } };
  const { ssrCache, client } = await getServerSideLayoutProps(ctx, ELayout.DoubleColumn);
  const { data } = await client.query<RedditMemeCountQuery, RedditMemeCountQueryVariables>(RedditMemeCountDocument, {}).toPromise();
  if (!data?.redditMemeCount) throw new Error("back reddit meme count");
  const maxSkip = data?.redditMemeCount - 10;
  const initialSkip = between(0, maxSkip);
  await client
    .query<RandomRedditMemesQuery, RandomRedditMemesQueryVariables>(RandomRedditMemesDocument, { take: 10, skip: initialSkip })
    .toPromise();
  return { props: { initialSkip, maxSkip, urqlState: ssrCache.extractData() } };
};

interface PageProps {
  initialSkip: number;
  maxSkip: number;
}

const Page: NextPage<PageProps> = ({ initialSkip, maxSkip }) => {
  const [index, setIndex] = useState(0);
  const [skip, setSkip] = useState(initialSkip);
  const [RandomRedditMemesResp] = useRandomRedditMemesQuery({ variables: { take: 10, skip } });
  const redditMemes = RandomRedditMemesResp.data?.randomRedditMemes || [undefined];
  const currentMeme = redditMemes[index];
  return (
    <DoubleColLayout>
      <Stack direction={{ base: "column", md: "row" }} h="85vh" w="100%" px={2}>
        <VStack w="100%" p={2}>
          <Button
            size="xs"
            isDisabled={RandomRedditMemesResp.fetching}
            onClick={() =>
              setIndex((i) => {
                if (i !== 9) return i + 1;
                setSkip(between(0, maxSkip));
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
            isLoaded={Boolean(currentMeme && !RandomRedditMemesResp.fetching)}
            skeleton={{ w: "15rem", h: "15rem" }}
            _hover={{ cursor: "pointer" }}
            px={2}
            maxH="60vh"
            src={currentMeme?.url}
          />
        </VStack>
        {currentMeme?.redditBet ? <BetResultMenu size="xs" redditBet={currentMeme?.redditBet} /> : <BetForm redditMeme={currentMeme} />}
      </Stack>
    </DoubleColLayout>
  );
};
export default withUrqlClient(nextUrqlClient)(Page);
