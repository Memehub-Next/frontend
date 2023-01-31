import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, StackProps, Text, useBoolean, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiBookBookmark } from "react-icons/bi";
import { ELeaderboard, useLeaderboardQuery } from "../../graphql/urql-codegen";
import { useRedirect } from "../../hooks/useRedirect";
import { Leader } from "./Leader";
import { MyRank } from "./MyRank";

const leaderboards = Object.values(ELeaderboard);

interface LeaderboardWidgetProps extends StackProps {}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = React.memo((stackProps) => {
  const redirect = useRedirect();
  const [index, setIndex] = useState(0);
  const [userCalled, { off, on }] = useBoolean(false);
  const [{ data }] = useLeaderboardQuery({ variables: { eLeaderboard: leaderboards[index], take: 3, skip: 0 } });
  const userSetIndex = () => {
    on();
    setIndex((index) => (index + 1) % leaderboards.length);
  };
  useEffect(() => {
    if (userCalled) return off();
    const id = setTimeout(() => setIndex((index) => (index + 1) % leaderboards.length), 1000 * 60);
    return () => clearTimeout(id);
  }, [index]);
  return (
    <VStack w="100%" {...stackProps}>
      <HStack w="100%" justifyContent="space-between">
        <HStack w={32} justifyContent="space-between">
          <ChevronLeftIcon _hover={{ cursor: "pointer" }} onClick={userSetIndex} />
          <Text>{leaderboards[index]}</Text>
          <ChevronRightIcon _hover={{ cursor: "pointer" }} onClick={userSetIndex} />
        </HStack>
        <Button size="xs" onClick={redirect("/history")}>
          <BiBookBookmark />
          <Text>History</Text>
        </Button>
      </HStack>
      <VStack w="100%" spacing={0}>
        <MyRank eLeaderboard={leaderboards[index]} />
        {(data?.leaderboard.items ?? Array<undefined>(3).fill(undefined)).map((leader, idx) => (
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
      </VStack>
    </VStack>
  );
});
