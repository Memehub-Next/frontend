import { Center, HStack, Image, StackProps, Text } from "@chakra-ui/react";
import Humanize from "humanize-plus";
import { LeaderFragment } from "../../graphql/urql-codegen";
import { DEFAULT_AVATAR } from "../../utils/constants";
import { AvatarLink } from "../misc/AvatarLink";

interface LeaderProps extends StackProps {
  leader?: LeaderFragment;
}

export const Leader: React.FC<LeaderProps> = ({ leader, ...stackProps }) => (
  <HStack py={3} px={5} w="100%" justifyContent="space-between" _hover={{ backgroundColor: "gray.800", cursor: "pointer" }} {...stackProps}>
    <HStack spacing={3}>
      <RankMedal rank={leader?.rank} />
      <HStack>
        <AvatarLink src={leader?.avatar || DEFAULT_AVATAR} username={leader?.username} border="1px solid white" size="sm" />
        <Text noOfLines={1} maxW="100%">
          {leader?.username}
        </Text>
      </HStack>
    </HStack>
    <HStack>
      <Text noOfLines={1} color={(leader?.profitLoss || 1) > 0 ? "green.500" : "red.500"} textAlign="center" fontWeight="bold">
        {((leader?.profitLoss || 1) > 0 ? "+" : "") + Humanize.compactInteger(leader?.profitLoss || 0, 1).toString()}
      </Text>
      <Text>GBP</Text>
    </HStack>
  </HStack>
);

interface RankMedalProps {
  rank?: number;
}

const RankMedal: React.FC<RankMedalProps> = ({ rank }) => {
  switch (rank) {
    case 1:
      return <Image h={8} w={12} src="/icons/first_place.png" />;
    case 2:
      return <Image h={8} w={12} src="/icons/second_place.png" />;
    case 3:
      return <Image h={8} w={12} src="/icons/third_place.png" />;
    default:
      return (
        <Center h={8} w={12}>
          <Text noOfLines={1}>{typeof rank === "undefined" ? 0 : Humanize.compactInteger(rank, 1)}</Text>
        </Center>
      );
  }
};
