import { Button, Skeleton, Table, TableProps, Tbody, Td, Th, Thead, Tr, useBoolean, VStack } from "@chakra-ui/react";
import humanizeDuration from "humanize-duration";
import Humanize from "humanize-plus";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { EPositionSide, ERedditBetOrder, useUserRedditBetsPaginatedQuery } from "../../../graphql/urql-codegen";

import { SkeletonText, Text, TextProps } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSkipPagination } from "../../../hooks/useSkipPagination";
dayjs.extend(relativeTime);

interface ExtendedTextProps extends TextProps {
  isLoaded: boolean;
  example: string;
  isNull?: boolean;
}

const ExtendedText: React.FC<ExtendedTextProps> = ({ isLoaded, example, noOfLines = 1, isNull = false, children, ...textProps }) => {
  return (
    <SkeletonText noOfLines={noOfLines} isLoaded={isLoaded}>
      {isLoaded && isNull ? null : (
        <Text noOfLines={noOfLines} {...textProps}>
          {!isLoaded ? example : children}
        </Text>
      )}
    </SkeletonText>
  );
};

interface RedditBetsTableProps extends TableProps {
  username: string;
  seasonId?: number;
}

export const RedditBetsTable: React.FC<RedditBetsTableProps> = React.memo(({ username, seasonId, ...tableProps }) => {
  const [isAsc, { toggle }] = useBoolean(false);
  const { take, skip, loadMore } = useSkipPagination(9);
  const [isYolo, setIsYolo] = useState<boolean>();
  const [eRedditBetOrder, setERedditBetOrder] = useState(ERedditBetOrder.CreatedAt);
  const [ePositionSide, setEPositionSide] = useState<EPositionSide>();
  const [{ data }] = useUserRedditBetsPaginatedQuery({
    variables: { isASC: isAsc, isYolo, eRedditBetOrder, skip, take, username, ePositionSide, seasonId },
    pause: !seasonId,
  });
  const isLoaded = Boolean(data?.userRedditBetsPaginated.items.length);
  const redditBets = data?.userRedditBetsPaginated.items || [];
  const hasMore = Boolean(data?.userRedditBetsPaginated.hasMore);
  const getOnClick = (buttonType: ERedditBetOrder) => () => buttonType === eRedditBetOrder ? toggle() : setERedditBetOrder(buttonType);
  return (
    <>
      <Table {...tableProps}>
        <Thead>
          <Tr>
            <Th onClick={getOnClick(ERedditBetOrder.CreatedAt)} _hover={{ cursor: "pointer" }}>
              Created Ago
            </Th>
            <Th isNumeric onClick={getOnClick(ERedditBetOrder.BetSize)} _hover={{ cursor: "pointer" }}>
              Bet
            </Th>
            <Th isNumeric onClick={getOnClick(ERedditBetOrder.Percentile)} _hover={{ cursor: "pointer" }}>
              Percentile
            </Th>
            <Th
              onClick={() =>
                setEPositionSide((ePositionSide) =>
                  ePositionSide === EPositionSide.Buy
                    ? EPositionSide.Sell
                    : typeof ePositionSide === "undefined"
                    ? EPositionSide.Buy
                    : undefined
                )
              }
              _hover={{ cursor: "pointer" }}
            >
              Side
            </Th>
            <Th isNumeric onClick={getOnClick(ERedditBetOrder.Target)} _hover={{ cursor: "pointer" }}>
              Target
            </Th>
            <Th
              isNumeric
              onClick={() => setIsYolo((isYolo) => (isYolo ? !isYolo : typeof isYolo === "undefined" ? true : undefined))}
              _hover={{ cursor: "pointer" }}
            >
              Yolo
            </Th>
            <Th isNumeric onClick={getOnClick(ERedditBetOrder.ProfitLoss)} _hover={{ cursor: "pointer" }}>
              P/L
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {(redditBets || Array(9).fill(undefined)).map((redditBet, idx) => (
            <Tr key={idx}>
              <Td>
                <ExtendedText example="1 day, 19 hours, 39 minutes" isLoaded={isLoaded}>
                  {humanizeDuration(dayjs(redditBet?.createdAt).diff(), { round: true, largest: 3, units: ["y", "d", "h", "m"] })}
                </ExtendedText>
              </Td>
              <Td isNumeric>
                <ExtendedText example="40878 GBP" isLoaded={isLoaded}>
                  {Humanize.formatNumber(redditBet?.betSize ?? 0, 0)} GBP
                </ExtendedText>
              </Td>
              <Td isNumeric>
                <ExtendedText example="50" isLoaded={isLoaded}>
                  {redditBet?.percentile}
                </ExtendedText>
              </Td>
              <Td>
                <ExtendedText example="Buy >" isLoaded={isLoaded} color={redditBet?.side === EPositionSide.Buy ? "green" : "red"}>
                  {redditBet?.side}
                  {redditBet?.side === EPositionSide.Buy ? " >" : " <"}
                </ExtendedText>
              </Td>
              <Td isNumeric>
                <ExtendedText example="50" isLoaded={isLoaded}>
                  {redditBet?.target}
                </ExtendedText>
              </Td>
              <Td isNumeric>
                <Skeleton alignItems="flex-end" isLoaded={isLoaded} color={redditBet?.isYolo ? "green" : "red"}>
                  {redditBet?.isYolo ? <AiOutlineCheck /> : <MdOutlineClose />}
                </Skeleton>
              </Td>
              <Td isNumeric color={(redditBet?.profitLoss || 0) > 0 ? "green" : "red"}>
                <ExtendedText example="100_000" isLoaded={isLoaded}>
                  {Humanize.formatNumber(redditBet?.profitLoss ?? 0, 0)}
                </ExtendedText>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <VStack w="100%" py={3}>
        {hasMore && (
          <Button size="xs" onClick={loadMore}>
            LoadMore
          </Button>
        )}
      </VStack>
    </>
  );
});
