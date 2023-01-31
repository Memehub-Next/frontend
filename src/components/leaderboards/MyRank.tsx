import { Divider } from "@chakra-ui/react";
import { ELeaderboard, useMyLeaderboardQuery } from "../../graphql/urql-codegen";
import { Leader } from "./Leader";

interface MyRankProps {
  eLeaderboard: ELeaderboard;
  seasonId?: number;
}

export const MyRank: React.FC<MyRankProps> = ({ eLeaderboard, seasonId }) => {
  const [{ data }] = useMyLeaderboardQuery({ variables: { eLeaderboard, seasonId } });
  if (!data?.myLeaderboard) return <></>;
  return (
    <>
      <Leader
        leader={data.myLeaderboard}
        rank={data.myLeaderboard.rank}
        py={3}
        px={5}
        w="100%"
        justifyContent="space-between"
        _hover={{ backgroundColor: "gray.800", cursor: "pointer" }}
      />
      <Divider />
    </>
  );
};
