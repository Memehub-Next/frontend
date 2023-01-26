import { Divider } from "@chakra-ui/react";
import { Optional } from "utility-types";
import { ELeaderboard, LeaderFragment, useMeQuery, useMyLeaderboardQuery } from "../../../graphql/urql-codegen";
import { Leader } from "./Leader";

interface MyRankProps {
  eLeaderboard: ELeaderboard;
  seasonId?: number;
}

export const MyRank: React.FC<MyRankProps> = ({ eLeaderboard, seasonId }) => {
  const [meResp] = useMeQuery();
  const me = meResp.data?.me;
  const [{ data, fetching }] = useMyLeaderboardQuery({ variables: { eLeaderboard, seasonId }, pause: !me });
  const leader: Optional<LeaderFragment, "profitLoss" | "rank"> | undefined =
    !fetching && data?.myLeaderboard ? data.myLeaderboard : !me ? undefined : { username: me.username };
  return !me ? (
    <></>
  ) : (
    <>
      <Leader
        leader={leader}
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
