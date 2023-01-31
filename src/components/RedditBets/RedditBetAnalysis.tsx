import { Collapse, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useUserRedditBetsQuery } from "../../graphql/urql-codegen";
import { NullableEnumButtons } from "../misc/NullableEnumButtons";
import { GbpLineChart } from "./components/GbpLineChart";
import { ProfitLossBarChart } from "./components/ProfitLossBarChart";
import { RedditBetsTable } from "./components/RedditBetsTable";
import { SeasonSummaryTable } from "./components/SeasonSummaryTable";
import { SeasonNumberInput } from "./SeasonNumberInput";

enum ERedditBetGraph {
  TradePL = "Trade P/L",
  GBP = "GBP",
}

interface RedditBetAnalysisProps {
  username: string;
}

export const RedditBetAnalysis: React.FC<RedditBetAnalysisProps> = ({ username }) => {
  const [seasonId, setSeasonId] = useState<number>();
  const [graph, setGraph] = useState<ERedditBetGraph>();
  const [{ data }] = useUserRedditBetsQuery({ variables: { username, take: 30, seasonId }, pause: !seasonId });
  return (
    <VStack>
      <Text>Reddit Bets Analysis</Text>
      <HStack>
        <SeasonNumberInput seasonId={seasonId} setSeasonId={setSeasonId} />
        <NullableEnumButtons size="xs" eEnum={ERedditBetGraph as any} selected={graph} setSelected={setGraph} />
      </HStack>
      <VStack as={Collapse} in={Boolean(graph)} w="100%">
        <ProfitLossBarChart redditBets={data?.userRedditBets} />
        <GbpLineChart seasonId={seasonId} username={username} redditBets={data?.userRedditBets} />
      </VStack>
      <SeasonSummaryTable seasonId={seasonId} username={username} />
      <RedditBetsTable seasonId={seasonId} username={username} />
    </VStack>
  );
};
