import { Button, Center, HStack, StackProps, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { ELeaderboard } from "../../../graphql/urql-codegen";
import { Leaderboard } from "../Leaderboard";

interface SeasonHistoryProps extends StackProps {
  seasonId?: number;
}

export const SeasonHistory: React.FC<SeasonHistoryProps> = ({ seasonId, ...stackProps }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <VStack {...stackProps}>
      <HStack display={{ base: "inline", sm: "flex" }} w="100%" justifyContent="space-around">
        {[
          { label: "Best Trade", eLeaderboard: ELeaderboard.BestTrade },
          { label: "Largest YOLO", eLeaderboard: ELeaderboard.LargestYolo },
          { label: "Most Profit", eLeaderboard: ELeaderboard.Season },
        ].map(({ label, eLeaderboard }, idx) => (
          <VStack key={idx}>
            <Center>
              <Text>{label}</Text>
            </Center>
            <Leaderboard seasonId={seasonId} eLeaderboard={eLeaderboard} showMore={isOpen} take={10} />
          </VStack>
        ))}
      </HStack>
      <Button size="xs" onClick={onToggle}>
        View {isOpen ? "Less" : "More"}
      </Button>
    </VStack>
  );
};
