import { SkeletonText, Table, TableProps, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import { Omit } from "utility-types";
import { SeasonSummaryFragment, useSeasonSummaryQuery } from "../../graphql/urql-codegen";

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

export const SeasonSummaryTable: React.FC<SeasonSummaryTableProps> = ({ username, seasonId, ...tableProps }) => {
  const [{ data }] = useSeasonSummaryQuery({ variables: { username, seasonId }, pause: !seasonId });
  const isLoaded = Boolean(data?.seasonSummary);
  const summary = data?.seasonSummary;
  return (
    <>
      <Table {...tableProps}>
        <Tbody>
          {keys.slice(0, Math.floor(keys.length / 2)).map((key) => (
            <Tr key={key}>
              <Td isNumeric={true} _hover={{ cursor: "pointer" }}>
                {labels[key]}
              </Td>
              <Td isNumeric>
                <SkeletonText noOfLines={1} isLoaded={isLoaded}>
                  <Text noOfLines={1}>{summary ? summary[key] : undefined}</Text>
                </SkeletonText>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Table {...tableProps}>
        <Tbody>
          {keys.slice(Math.ceil(keys.length / 2)).map((key) => (
            <Tr key={key}>
              <Td isNumeric={true} _hover={{ cursor: "pointer" }}>
                {labels[key]}
              </Td>
              <Td isNumeric>
                <SkeletonText noOfLines={1} isLoaded={isLoaded}>
                  <Text noOfLines={1}>{summary ? summary[key] : undefined}</Text>
                </SkeletonText>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
