import { Button, ButtonProps } from "@chakra-ui/button";
import { Box, HStack, Menu, MenuButton, MenuList, Text, useDisclosure } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { EPositionSide, RedditBetFragment } from "../../graphql/urql-codegen";

interface BetResultMenuProps extends ButtonProps {
  redditBet: RedditBetFragment;
}

export const BetResultMenu: React.FC<BetResultMenuProps> = ({
  redditBet: { side, target, betSize, percentile, profitLoss },
  ...buttonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Menu isLazy isOpen={isOpen}>
        <MenuButton
          as={Button}
          variant={profitLoss > 0 ? "upvoteActive" : "downvoteActive"}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          {...buttonProps}
        >
          <HStack>
            <Text>{(profitLoss > 0 ? "+" : "") + profitLoss.toString()}</Text>
            <Text>GBP</Text>
          </HStack>
        </MenuButton>
        <MenuList zIndex={100} as={Table} onMouseEnter={onOpen} onMouseLeave={onClose}>
          <Tbody>
            {[
              { label: "Side", value: side, color: side === EPositionSide.Buy ? "green.700" : "red.700" },
              { label: "Target Percentile", value: target },
              { label: "Meme's Percentile", value: percentile.toString() },
              { label: "Bet Size", value: `${betSize} GBP` },
              { label: "Profit/Loss", value: `${profitLoss} GBP`, color: profitLoss > 0 ? "green.700" : "red.700" },
            ].map(
              ({ label, value, color }, idx) =>
                value && (
                  <Tr key={idx}>
                    <Td>{label}</Td>
                    <Td isNumeric color={color}>
                      {value}
                    </Td>
                  </Tr>
                )
            )}
          </Tbody>
        </MenuList>
      </Menu>
    </Box>
  );
};
