import { Box, Collapse, VStack } from "@chakra-ui/react";
import React from "react";
import { ELeaderboard, useLeaderboardQuery } from "../../graphql/urql-codegen";
import { Leader } from "./components/Leader";
import { MyRank } from "./components/MyRank";

interface LeaderboardProps {
  eLeaderboard: ELeaderboard;
  show?: number;
  take?: number;
  seasonId?: number;
  showMore?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ eLeaderboard, take, show = 3, showMore, seasonId }) => {
  const [{ data }] = useLeaderboardQuery({ variables: { eLeaderboard, take, seasonId } });
  const leaders = data?.leaderboard ?? Array<undefined>(show).fill(undefined);
  return (
    <VStack w="100%" spacing={0}>
      <MyRank eLeaderboard={eLeaderboard} seasonId={seasonId} />
      {leaders.slice(0, show).map((leader, idx) => (
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
      {leaders.length > show && (
        <Box as={Collapse} in={showMore} w="100%">
          {leaders.slice(show).map((leader, idx) => (
            <Leader
              key={idx}
              rank={leader?.rank || idx + 1 + show}
              leader={leader}
              py={3}
              px={5}
              w="100%"
              justifyContent="space-between"
              _hover={{ backgroundColor: "gray.800", cursor: "pointer" }}
            />
          ))}
        </Box>
      )}
    </VStack>
  );
};
