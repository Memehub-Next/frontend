import { ButtonProps } from "@chakra-ui/button";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { EPositionSide, RedditBetFragment } from "../../graphql/urql-codegen";

interface BetResultMenuProps extends ButtonProps {
  redditBet: RedditBetFragment;
}

export const BetResultMenu: React.FC<BetResultMenuProps> = ({ redditBet: { side, target, betSize, percentile, profitLoss } }) => {
  return (
    <Table w="40%">
      <Tbody>
        <Tr>
          <Td>Side</Td>
          <Td isNumeric color={side === EPositionSide.Buy ? "green.700" : "red.700"}>
            {side}
          </Td>
        </Tr>
        {target && (
          <Tr>
            <Td>Target</Td>
            <Td isNumeric>{target}</Td>
          </Tr>
        )}
        <Tr>
          <Td>Meme's Percentile</Td>
          <Td isNumeric>{percentile.toString()}</Td>
        </Tr>
        <Tr>
          <Td>Bet Size</Td>
          <Td isNumeric>{betSize} GBP</Td>
        </Tr>
        <Tr>
          <Td>Profit/Loss</Td>
          <Td isNumeric color={profitLoss > 0 ? "green.700" : "red.700"}>
            {profitLoss} GBP
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
