import { Checkbox, Collapse, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { EPositionSide, useUserRedditBetsQuery } from "../../graphql/urql-codegen";
import { NullableEnumButtons } from "../enum/NullableEnumButtons";
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
  const [isYolo, setIsYolo] = useState<boolean>();
  const [ePositionSide, setEPositionSide] = useState<EPositionSide>();
  const [seasonId, setSeasonId] = useState<number>();
  const [graph, setGraph] = useState<ERedditBetGraph>();
  const [{ data }] = useUserRedditBetsQuery({ variables: { username, isYolo, take: 30, ePositionSide, seasonId }, pause: !seasonId });
  const GraphComponent = () => {
    switch (graph) {
      case ERedditBetGraph.TradePL:
        return <ProfitLossBarChart redditBets={data?.userRedditBets} />;
      case ERedditBetGraph.GBP:
        return <GbpLineChart seasonId={seasonId} username={username} redditBets={data?.userRedditBets} />;
      default:
        return <></>;
    }
  };
  const getYoloToggler = (activeValue: boolean) => () =>
    setIsYolo((isYolo) => {
      switch (true) {
        case isYolo === true:
          return activeValue ? undefined : false;
        case isYolo === false:
          return activeValue ? true : undefined;
        default:
          return activeValue;
      }
    });
  return (
    <VStack>
      <Text>Reddit Bets Analysis</Text>
      <HStack>
        <SeasonNumberInput seasonId={seasonId} setSeasonId={setSeasonId} />
        <NullableEnumButtons size="xs" eEnum={ERedditBetGraph as any} selected={graph} setSelected={setGraph} />
      </HStack>
      <VStack as={Collapse} in={Boolean(graph)} w="100%">
        <HStack justifyContent="center" w="100%">
          <NullableEnumButtons
            size="xs"
            eEnum={EPositionSide as any}
            selected={ePositionSide}
            setSelected={setEPositionSide}
            eEnumProps={{ [EPositionSide.Buy]: { variant: "upvote" }, [EPositionSide.Sell]: { variant: "downvote" } }}
          />
          <Checkbox isChecked={isYolo === true} onChange={getYoloToggler(true)}>
            <Text>Yolo</Text>
          </Checkbox>
          <Checkbox isChecked={isYolo === false} onChange={getYoloToggler(false)}>
            <Text>Not Yolo</Text>
          </Checkbox>
        </HStack>
        <GraphComponent />
      </VStack>
      <SeasonSummaryTable seasonId={seasonId} username={username} />
      <RedditBetsTable seasonId={seasonId} username={username} />
    </VStack>
  );
};
