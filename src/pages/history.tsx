import { Divider, HStack, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import InfiniteScroll from "react-infinite-scroll-component";
import { ELayout, getServerSideLayoutProps } from "../components/layout/getServerSideLayoutProps";
import { SingleColLayout } from "../components/layout/singleColLayout";
import { Leader } from "../components/leaderboards/Leader";
import { endMessage } from "../components/misc/endMessage";
import { EnumSelect } from "../components/misc/EnumOptions";
import { loader } from "../components/misc/loader";
import { NumberInputWrapper } from "../components/misc/NumberInputWrapper";
import { nextUrqlClient } from "../graphql/urql-client/nextUrqlClient";
import {
  ELeaderboard,
  LeaderboardDocument,
  LeaderboardQuery,
  LeaderboardQueryVariables,
  MyLeaderboardDocument,
  MyLeaderboardQuery,
  MyLeaderboardQueryVariables,
  useGetCurrentSeasonIdQuery,
  useLeaderboardQuery,
  useMyLeaderboardQuery,
} from "../graphql/urql-codegen";
import { useSkipPagination } from "../hooks/useSkipPagination";

interface PageProps {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userAgent = ctx.req.headers["user-agent"] as string;
  const { isMobile } = getSelectorsByUserAgent(userAgent);
  if (isMobile) return { redirect: { permanent: false, destination: "/about/mobile" } };
  const { ssrCache, client, seasonId } = await getServerSideLayoutProps(ctx, ELayout.SingleColumn);
  for (const eLeaderboard of Object.values(ELeaderboard)) {
    await client.query<MyLeaderboardQuery, MyLeaderboardQueryVariables>(MyLeaderboardDocument, { eLeaderboard, seasonId }).toPromise();
    await client
      .query<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, {
        eLeaderboard,
        take: 10,
        skip: 0,
        seasonId,
      })
      .toPromise();
  }
  return { props: { urqlState: ssrCache.extractData() } };
};

const Page: NextPage<PageProps> = () => {
  const [seasonIdResp] = useGetCurrentSeasonIdQuery();
  const [seasonId, setSeasonId] = useState(seasonIdResp.data?.getCurrentSeasonId);
  const [eLeaderboard, setELeaderboard] = useState(ELeaderboard.BestTrade);
  const { take, skip, loadMore, reset: resetSkip } = useSkipPagination(10);
  const [{ data }] = useLeaderboardQuery({ variables: { eLeaderboard, take, skip, seasonId } });
  const [myLeaderboardResp] = useMyLeaderboardQuery({ variables: { eLeaderboard, seasonId } });
  return (
    <SingleColLayout>
      <VStack w="100%">
        <HStack>
          <NumberInputWrapper
            size="xs"
            step={1}
            min={1}
            max={seasonIdResp.data?.getCurrentSeasonId}
            defaultValue={seasonId}
            value={seasonId}
            onChange={(seasonId) => {
              setSeasonId(seasonId);
              resetSkip();
            }}
            prefix="Season "
          />
          <EnumSelect
            eEnumToLabel={{
              [ELeaderboard.BestTrade]: "Best Trade",
              [ELeaderboard.LargestYolo]: "Largest YOLO",
              [ELeaderboard.Season]: "Season",
              [ELeaderboard.Daily]: "Today",
              [ELeaderboard.Weekly]: "This Week",
              [ELeaderboard.Ever]: "Ever",
            }}
            size="xs"
            eEnum={ELeaderboard}
            setSelected={(eLeaderboard) => {
              setELeaderboard(eLeaderboard);
              resetSkip();
            }}
          />
        </HStack>
        <InfiniteScroll
          dataLength={data?.leaderboard.items.length || 6}
          next={loadMore}
          hasMore={Boolean(data?.leaderboard.hasMore)}
          loader={loader}
          endMessage={endMessage}
        >
          {myLeaderboardResp.data?.myLeaderboard && myLeaderboardResp.data.myLeaderboard.rank > 3 && (
            <>
              <Leader leader={myLeaderboardResp.data.myLeaderboard} />
              <Divider />
            </>
          )}
          {(data?.leaderboard.items ?? Array<undefined>(6).fill(undefined)).map((leader, idx) => (
            <Leader key={idx} leader={leader} />
          ))}
        </InfiniteScroll>
      </VStack>
    </SingleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
