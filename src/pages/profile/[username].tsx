import { Avatar, Badge, HStack, Image, SkeletonText, Text, Tooltip, VStack } from "@chakra-ui/react";
import Humanize from "humanize-plus";
import { GetServerSideProps, NextPage } from "next";
import { initUrqlClient, withUrqlClient } from "next-urql";
import { useState } from "react";
import { ssrExchange } from "urql";
import * as yup from "yup";
import { InferType } from "yup";
import { DoubleColLayout } from "../../components/layout/doubleColLayout";
import { GbpLineChart } from "../../components/RedditBets/components/GbpLineChart";
import { ProfitLossBarChart } from "../../components/RedditBets/components/ProfitLossBarChart";
import { RedditBetsTable } from "../../components/RedditBets/components/RedditBetsTable";
import { SeasonSummaryTable } from "../../components/RedditBets/components/SeasonSummaryTable";
import { SeasonNumberInput } from "../../components/RedditBets/SeasonNumberInput";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import {
  GetCurrentSeasonIdDocument,
  MeDocument,
  TotalGbpDocument,
  UserDocument,
  UserRedditBetsDocument,
  useTotalGbpQuery,
  useUserQuery,
  useUserRedditBetsQuery,
  WojakLevelDocument,
} from "../../graphql/urql-codegen";
import { DEFAULT_AVATAR } from "../../utils/constants";

const queryParamSchema = yup.object({
  username: yup.string().required(),
});

interface PageProps extends yup.InferType<typeof queryParamSchema> {}

export const getServerSideProps: GetServerSideProps<InferType<typeof queryParamSchema>> = async ({ query }) => {
  try {
    const { username } = await queryParamSchema.validate(query, { strict: true });
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient(nextUrqlClient(ssrCache), false);
    if (!client) throw new Error("where URQL client?");
    await client.query(MeDocument, {}).toPromise();
    await client.query(GetCurrentSeasonIdDocument, {}).toPromise();
    await client.query(UserDocument, { username }).toPromise();
    await client.query(TotalGbpDocument, { username }).toPromise();
    await client.query(WojakLevelDocument, { username }).toPromise();
    await client.query(UserRedditBetsDocument, { take: 30, username }).toPromise();
    return { props: { username, urqlState: ssrCache.extractData() } };
  } catch (error) {
    console.error(error);
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }
};

const Page: NextPage<PageProps> = ({ username }) => {
  const [userResp] = useUserQuery({ variables: { username } });
  const [totalGbpResp] = useTotalGbpQuery({ variables: { username } });
  const [seasonId, setSeasonId] = useState<number>();
  const [{ data }] = useUserRedditBetsQuery({ variables: { username, take: 30, seasonId }, pause: !seasonId });
  const user = userResp.data?.user;
  const gbp = totalGbpResp.data?.totalGbp ?? 0;
  return (
    <DoubleColLayout>
      <VStack w="100%">
        <VStack w="100%" spacing={5}>
          <HStack spacing={3}>
            <Avatar size="xl" src={user?.avatar || DEFAULT_AVATAR} />
            <VStack>
              <SkeletonText noOfLines={1} isLoaded={Boolean(user?.username)}>
                <Text noOfLines={1} fontSize="xl" fontWeight="bold">
                  {user?.username}
                </Text>
              </SkeletonText>
              <SkeletonText noOfLines={1} isLoaded={Boolean(user?.username)}>
                <Text noOfLines={1}>{Humanize.formatNumber(gbp, 0)} GBP</Text>
              </SkeletonText>
              <Tooltip shouldWrapChildren label={<Image h="10rem" src={`/wojak/${user?.wojakLevel}.png`} />}>
                <Badge _hover={{ cursor: "pointer" }}>Level {user?.wojakLevel}</Badge>
              </Tooltip>
            </VStack>
          </HStack>
          <VStack>
            <Text>Reddit Bets Analysis</Text>
            <SeasonNumberInput seasonId={seasonId} setSeasonId={setSeasonId} />
            <ProfitLossBarChart redditBets={data?.userRedditBets} />
            <GbpLineChart seasonId={seasonId} username={username} redditBets={data?.userRedditBets} />
            <SeasonSummaryTable seasonId={seasonId} username={username} />
            <RedditBetsTable seasonId={seasonId} username={username} />
          </VStack>
        </VStack>
      </VStack>
    </DoubleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
