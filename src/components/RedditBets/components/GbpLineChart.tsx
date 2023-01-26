import { Skeleton, VStack } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { RedditBetFragment, useGbpBySeasonQuery } from "../../../graphql/urql-codegen";

interface GbpLineChartProps {
  username: string;
  redditBets?: RedditBetFragment[];
  seasonId: number | undefined;
}

export const GbpLineChart: React.FC<GbpLineChartProps> = React.memo(({ redditBets, username, seasonId }) => {
  const [{ data: gbpData }] = useGbpBySeasonQuery({ variables: { username, seasonId: seasonId! }, pause: !seasonId });
  const data =
    gbpData && redditBets?.length
      ? redditBets
          .reduce<{ x: number; y: number }[]>(
            (prev, { profitLoss }, idx) => [...prev, { x: idx + 1, y: prev.slice(-1)[0].y - profitLoss }],
            [{ x: 0, y: gbpData?.gbpBySeason }]
          )
          .reverse()
      : [];
  return (
    <VStack>
      <Skeleton w="50rem" h="15rem" isLoaded={Boolean(data.length)}>
        <ResponsiveLine
          data={[{ id: "GBP", data }]}
          colors={["#fff"]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear" }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Bets", legendOffset: 36, legendPosition: "middle" }}
          axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "GBP", legendOffset: -40, legendPosition: "middle" }}
          pointSize={5}
          pointColor="#fff"
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          theme={{ axis: { ticks: { text: { fill: "#fff" } }, legend: { text: { fill: "#fff" } } } }}
          legends={[
            {
              itemTextColor: "#fff",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </Skeleton>
    </VStack>
  );
});
