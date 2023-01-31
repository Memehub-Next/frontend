import { SkeletonText, Table, TableProps, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Omit } from "utility-types";
import { SeasonSummaryFragment, useSeasonSummaryQuery } from "../../../graphql/urql-codegen";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const keys: (keyof Omit<SeasonSummaryFragment, "__typename">)[] = [
  "numTrades",
  "numGoodTrades",
  "numBuys",
  "numIsYolo",
  "profitLossTotal",
  "profitLossPerTrade",
  "betSizeAvg",
  "targetAvg",
  "percentileAvg",
];

const labels: Record<keyof Omit<SeasonSummaryFragment, "__typename">, string> = {
  numTrades: "# Trades",
  numGoodTrades: "# Good Trades",
  profitLossTotal: "Total P/L",
  profitLossPerTrade: "P/L per Trade",
  numIsYolo: "# Yolos",
  targetAvg: "Avg Target",
  percentileAvg: "Avg Percentile",
  betSizeAvg: "Avg Bet",
  numBuys: "# Buys",
};

interface SeasonSummaryTableProps extends TableProps {
  username: string;
  seasonId?: number;
}

export const SeasonSummaryTable: React.FC<SeasonSummaryTableProps> = React.memo(({ username, seasonId, ...tableProps }) => {
  const [{ data }] = useSeasonSummaryQuery({ variables: { username, seasonId }, pause: !seasonId });
  const isLoaded = Boolean(data?.seasonSummary);
  const summary = data?.seasonSummary;
  return (
    <Table {...tableProps}>
      <Thead>
        <Tr>
          {keys.map((key) => (
            <Th key={key} isNumeric={true} _hover={{ cursor: "pointer" }}>
              {labels[key]}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          {keys.map((key) => (
            <Td isNumeric key={key}>
              <SkeletonText noOfLines={1} isLoaded={isLoaded}>
                <Text noOfLines={1}>{summary ? summary[key] : undefined}</Text>
              </SkeletonText>
            </Td>
          ))}
        </Tr>
      </Tbody>
    </Table>
  );
});
