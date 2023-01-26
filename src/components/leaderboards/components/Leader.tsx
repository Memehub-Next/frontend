import { HStack, StackProps, Text } from "@chakra-ui/react";
import Humanize from "humanize-plus";
import { Optional } from "utility-types";
import { DEFAULT_AVATAR } from "../../../core/utils/constants";
import { LeaderFragment } from "../../../graphql/urql-codegen";
import { ExtendedText } from "../../chakra/ExtendedText";
import { AvatarLink } from "../../user/AvatarLink";
import { RankMedal } from "./RankMedal";

interface LeaderProps extends StackProps {
  rank?: number;
  leader?: Optional<LeaderFragment, "profitLoss" | "rank">;
}

export const Leader: React.FC<LeaderProps> = ({ rank, leader, ...stackProps }) => {
  return (
    <HStack {...stackProps}>
      <HStack spacing={3}>
        <RankMedal rank={leader?.rank ?? rank} />
        <HStack>
          <AvatarLink src={leader?.avatar || DEFAULT_AVATAR} username={leader?.username} border="1px solid white" size="sm" />
          <ExtendedText example="memehub" noOfLines={1} isLoaded={Boolean(leader?.username)} maxW="100%">
            {leader?.username}
          </ExtendedText>
        </HStack>
      </HStack>
      <HStack>
        <ExtendedText
          example="+1000"
          noOfLines={1}
          isLoaded={typeof leader?.profitLoss !== "undefined"}
          color={(leader?.profitLoss || 1) > 0 ? "green.500" : "red.500"}
          textAlign="center"
          fontWeight="bold"
        >
          {((leader?.profitLoss || 1) > 0 ? "+" : "") + Humanize.compactInteger(leader?.profitLoss || 0, 1).toString()}
        </ExtendedText>
        <Text>GBP</Text>
      </HStack>
    </HStack>
  );
};
