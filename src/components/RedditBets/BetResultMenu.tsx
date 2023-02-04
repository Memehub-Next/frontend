import { ButtonProps } from "@chakra-ui/button";
import { Center } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { EPositionSide, RedditBetFragment } from "../../graphql/urql-codegen";

interface BetResultMenuProps extends ButtonProps {
  redditBet: RedditBetFragment;
}

export const BetResultMenu: React.FC<BetResultMenuProps> = ({ redditBet }) => (
  <Center w={{ base: "100%", md: "50%" }}>
    <Table>
      <Tbody>
        <Tr>
          <Td>Side</Td>
          <Td isNumeric color={redditBet.side === EPositionSide.Buy ? "green.700" : "red.700"}>
            {redditBet.side}
          </Td>
        </Tr>
        {redditBet.target && (
          <Tr>
            <Td>Target</Td>
            <Td isNumeric>{redditBet.target}</Td>
          </Tr>
        )}
        <Tr>
          <Td>Meme's Percentile</Td>
          <Td isNumeric>{redditBet.percentile.toString()}</Td>
        </Tr>
        <Tr>
          <Td>Bet Size</Td>
          <Td isNumeric>{redditBet.betSize} GBP</Td>
        </Tr>
        <Tr>
          <Td>Profit/Loss</Td>
          <Td isNumeric color={redditBet.profitLoss > 0 ? "green.700" : "red.700"}>
            {redditBet.profitLoss} GBP
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </Center>
);
