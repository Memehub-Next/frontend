import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, StackProps, Text, useBoolean, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiBookBookmark } from "react-icons/bi";
import { useRedirect } from "../../core/hooks/useRedirect";
import { ELeaderboard } from "../../graphql/urql-codegen";
import { Leaderboard } from "./Leaderboard";

const leaderboards = Object.values(ELeaderboard);

interface LeaderboardWidgetProps extends StackProps {}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = React.memo((stackProps) => {
  const redirect = useRedirect();
  const [index, setIndex] = useState(0);
  const [userCalled, { off, on }] = useBoolean(false);
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
        <Button size="xs" onClick={redirect("/seasons/history")}>
          <BiBookBookmark />
          <Text>History</Text>
        </Button>
      </HStack>
      <Leaderboard eLeaderboard={leaderboards[index]} />
    </VStack>
  );
});
