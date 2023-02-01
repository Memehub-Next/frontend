import { HStack, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SingleColLayout } from "../components/layout/singleColLayout";
import { Leader } from "../components/leaderboards/Leader";
import { MyRank } from "../components/leaderboards/MyRank";
import { endMessage } from "../components/misc/endMessage";
import { EnumSelect } from "../components/misc/EnumOptions";
import { loader } from "../components/misc/loader";
import { SeasonNumberInput } from "../components/RedditBets/SeasonNumberInput";
import { nextUrqlClient } from "../graphql/urql-client/nextUrqlClient";
import { ELeaderboard, useLeaderboardQuery } from "../graphql/urql-codegen";
import { useSkipPagination } from "../hooks/useSkipPagination";

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const [seasonId, setSeasonId] = useState<number>();
  const [eLeaderboard, setELeaderboard] = useState(ELeaderboard.BestTrade);
  const { take, skip, loadMore, reset } = useSkipPagination(10);
  const [{ data }] = useLeaderboardQuery({ variables: { eLeaderboard, take, skip, seasonId } });
  useEffect(reset, [eLeaderboard, seasonId]);
  return (
    <SingleColLayout>
      <VStack w="100%">
        <HStack>
          <SeasonNumberInput seasonId={seasonId} setSeasonId={setSeasonId} />
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
            setSelected={setELeaderboard}
          />
        </HStack>
        <InfiniteScroll
          dataLength={data?.leaderboard.items.length || 6}
          next={loadMore}
          hasMore={Boolean(data?.leaderboard.hasMore)}
          loader={loader}
          endMessage={endMessage}
        >
          <MyRank eLeaderboard={eLeaderboard} seasonId={seasonId} />
          {(data?.leaderboard.items ?? Array<undefined>(6).fill(undefined)).map((leader, idx) => (
            <Leader
              key={idx}
              rank={idx + 1}
              leader={leader}
              py={3}
              px={5}
              w="100%"
              justifyContent="space-between"
              _hover={{ backgroundColor: "gray.800", cursor: "pointer" }}
            />
          ))}
        </InfiniteScroll>
      </VStack>
    </SingleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient, { ssr: false })(Page);
