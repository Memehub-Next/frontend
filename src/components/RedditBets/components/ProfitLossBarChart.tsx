import { Skeleton, VStack } from "@chakra-ui/react";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";
import { RedditBetFragment } from "../../../graphql/urql-codegen";

interface ProfitLossBarChartProps {
  redditBets?: RedditBetFragment[];
}

export const ProfitLossBarChart: React.FC<ProfitLossBarChartProps> = React.memo(({ redditBets }) =>
  redditBets?.length === 0 ? (
    <></>
  ) : (
    <VStack>
      <Skeleton w="50rem" h="15rem" isLoaded={Boolean(redditBets?.length)}>
        <ResponsiveBar
          data={redditBets?.map(({ profitLoss }, idx) => ({ idx, profitLoss })).reverse() || []}
          keys={["profitLoss"]}
          colors={(value) => ((value.data.profitLoss || 0) > 0 ? "#1eff00" : "#ff0000")}
          colorBy="id"
          indexBy="idx"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "day",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "GBP",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          theme={{ axis: { ticks: { text: { fill: "#fff" } }, legend: { text: { fill: "#fff" } } } }}
          legends={[
            {
              itemTextColor: "#fff",
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              symbolSize: 20,
            },
          ]}
        />
      </Skeleton>
    </VStack>
  )
);
