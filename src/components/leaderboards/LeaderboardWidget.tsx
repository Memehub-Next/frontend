import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Divider, HStack, StackProps, Text, useBoolean, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiBookBookmark } from "react-icons/bi";
import { AllLeaderboardsDtoFragment, ELeaderboard, MyLeaderboardsDtoFragment } from "../../graphql/urql-codegen";
import { between } from "../../utils/between";
import { Leader } from "./Leader";

const leaderboards = Object.values(ELeaderboard);

const eLeaderboardTokey: Record<ELeaderboard, keyof Omit<AllLeaderboardsDtoFragment, "__typename">> = {
  [ELeaderboard.BestTrade]: "bestTrade",
  [ELeaderboard.Daily]: "daily",
  [ELeaderboard.Ever]: "ever",
  [ELeaderboard.LargestYolo]: "largestYolo",
  [ELeaderboard.Season]: "season",
  [ELeaderboard.Weekly]: "weekly",
};

interface LeaderboardWidgetProps extends StackProps {
  allLeaderboards?: AllLeaderboardsDtoFragment;
  myLeaderboards?: MyLeaderboardsDtoFragment;
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = React.memo(({ myLeaderboards, allLeaderboards, ...stackProps }) => {
  const router = useRouter();
  const [index, setIndex] = useState(between(0, leaderboards.length - 1));
  const [userCalled, { off, on }] = useBoolean(false);
  useEffect(() => {
    if (userCalled) return off();
    const id = setTimeout(() => setIndex((index) => (index + 1) % leaderboards.length), 1000 * 10);
    return () => clearTimeout(id);
  }, [index]);
  const eLeaderboard = leaderboards[index];
  const fragKey = eLeaderboardTokey[eLeaderboard];
  const myLeaderboard = myLeaderboards && myLeaderboards[fragKey] ? myLeaderboards[fragKey] : undefined;
  return (
    <VStack w="100%" {...stackProps}>
      <HStack w="100%" justifyContent="space-between">
        <HStack w={32} justifyContent="space-between">
          <ChevronLeftIcon
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              on();
              setIndex((index) => (index + leaderboards.length - 1) % leaderboards.length);
            }}
          />
          <Text>{eLeaderboard}</Text>
          <ChevronRightIcon
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              on();
              setIndex((index) => (index + 1) % leaderboards.length);
            }}
          />
        </HStack>
        <Button size="xs" onClick={() => router.push("/history")}>
          <BiBookBookmark />
          <Text>History</Text>
        </Button>
      </HStack>
      <VStack w="100%" spacing={0}>
        {myLeaderboard && myLeaderboard.rank > 3 && (
          <>
            <Leader leader={myLeaderboard} />
            <Divider />
          </>
        )}
        {(!allLeaderboards ? Array<undefined>(3).fill(undefined) : allLeaderboards[fragKey]).map((leader, idx) => (
          <Leader key={idx} leader={leader} />
        ))}
      </VStack>
    </VStack>
  );
});
