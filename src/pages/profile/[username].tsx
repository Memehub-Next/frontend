import { Avatar, Badge, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";
import Humanize from "humanize-plus";
import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import * as yup from "yup";
import { InferType } from "yup";
import { DoubleColLayout } from "../../components/layout/doubleColLayout";
import { ELayout, getServerSideLayoutProps } from "../../components/layout/getServerSideLayoutProps";
import { NumberInputWrapper } from "../../components/misc/NumberInputWrapper";
import { GbpLineChart } from "../../components/RedditBets/GbpLineChart";
import { ProfitLossBarChart } from "../../components/RedditBets/ProfitLossBarChart";
import { RedditBetsTable } from "../../components/RedditBets/RedditBetsTable";
import { SeasonSummaryTable } from "../../components/RedditBets/SeasonSummaryTable";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import {
  ERedditBetOrder,
  GbpBySeasonDocument,
  GbpBySeasonQuery,
  GbpBySeasonQueryVariables,
  SeasonSummaryDocument,
  SeasonSummaryQuery,
  SeasonSummaryQueryVariables,
  TotalGbpDocument,
  TotalGbpQuery,
  TotalGbpQueryVariables,
  useGetCurrentSeasonIdQuery,
  UserDocument,
  UserQuery,
  UserQueryVariables,
  UserRedditBetsDocument,
  UserRedditBetsPaginatedDocument,
  UserRedditBetsPaginatedQuery,
  UserRedditBetsPaginatedQueryVariables,
  UserRedditBetsQuery,
  UserRedditBetsQueryVariables,
  useTotalGbpQuery,
  useUserQuery,
  useUserRedditBetsQuery,
} from "../../graphql/urql-codegen";
import { DEFAULT_AVATAR } from "../../utils/constants";

const queryParamSchema = yup.object({
  username: yup.string().required(),
});

interface PageProps extends yup.InferType<typeof queryParamSchema> {}

export const getServerSideProps: GetServerSideProps<InferType<typeof queryParamSchema>> = async (ctx) => {
  const { username } = await queryParamSchema.validate(ctx.query, { strict: true });
  const userAgent = ctx.req.headers["user-agent"] as string;
  const { isMobile } = getSelectorsByUserAgent(userAgent);
  if (isMobile) return { redirect: { permanent: false, destination: "/about/mobile" } };
  const { ssrCache, client, seasonId } = await getServerSideLayoutProps(ctx, ELayout.DoubleColumn);
  await client.query<SeasonSummaryQuery, SeasonSummaryQueryVariables>(SeasonSummaryDocument, { username, seasonId }).toPromise();
  await client.query<GbpBySeasonQuery, GbpBySeasonQueryVariables>(GbpBySeasonDocument, { username, seasonId: seasonId ?? -1 }).toPromise();
  await client.query<UserQuery, UserQueryVariables>(UserDocument, { username }).toPromise();
  await client.query<TotalGbpQuery, TotalGbpQueryVariables>(TotalGbpDocument, { username }).toPromise();
  await client
    .query<UserRedditBetsQuery, UserRedditBetsQueryVariables>(UserRedditBetsDocument, { take: 30, username, seasonId })
    .toPromise();
  await client
    .query<UserRedditBetsPaginatedQuery, UserRedditBetsPaginatedQueryVariables>(UserRedditBetsPaginatedDocument, {
      take: 30,
      username,
      eRedditBetOrder: ERedditBetOrder.CreatedAt,
      isASC: false,
      skip: 0,
      seasonId,
    })
    .toPromise();
  return { props: { username, urqlState: ssrCache.extractData() } };
};

const Page: NextPage<PageProps> = ({ username }) => {
  const [userResp] = useUserQuery({ variables: { username } });
  const [totalGbpResp] = useTotalGbpQuery({ variables: { username } });
  const [seasonIdResp] = useGetCurrentSeasonIdQuery();
  const [seasonId, setSeasonId] = useState(seasonIdResp.data?.getCurrentSeasonId);
  const [{ data }] = useUserRedditBetsQuery({ variables: { username, take: 30, seasonId } });
  const user = userResp.data?.user;
  const gbp = totalGbpResp.data?.totalGbp ?? 0;
  return (
    <DoubleColLayout>
      <VStack w="100%">
        <VStack w="100%" spacing={5}>
          <HStack w="60%" spacing={3}>
            <VStack>
              <Avatar border="1px solid white" size="xl" src={user?.avatar || DEFAULT_AVATAR} />
              <Text noOfLines={1} fontSize="xl" fontWeight="bold">
                {user?.username}
              </Text>
              <Text noOfLines={1}>{Humanize.formatNumber(gbp, 0)} GBP</Text>
              <Tooltip shouldWrapChildren label={<Image h="10rem" src={`/wojak/${user?.wojakLevel}.png`} />}>
                <Badge _hover={{ cursor: "pointer" }}>Level {user?.wojakLevel}</Badge>
              </Tooltip>
            </VStack>
            <SeasonSummaryTable seasonId={seasonId} username={username} />
          </HStack>
          <VStack>
            <Text>Reddit Bets Analysis</Text>
            <NumberInputWrapper
              size="xs"
              step={1}
              min={1}
              max={seasonIdResp.data?.getCurrentSeasonId}
              defaultValue={seasonIdResp.data?.getCurrentSeasonId}
              value={seasonId}
              onChange={setSeasonId}
              prefix="Season "
            />
            <ProfitLossBarChart redditBets={data?.userRedditBets} />
            <GbpLineChart seasonId={seasonId} username={username} redditBets={data?.userRedditBets} />
            <RedditBetsTable seasonId={seasonId} username={username} />
          </VStack>
        </VStack>
      </VStack>
    </DoubleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
