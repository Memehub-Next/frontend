import { Center, Image } from "@chakra-ui/react";
import Humanize from "humanize-plus";
import { ExtendedText } from "../../chakra/ExtendedText";

interface RankMedalProps {
  rank?: number;
}

export const RankMedal: React.FC<RankMedalProps> = ({ rank }) => {
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
          <ExtendedText example="1000" isLoaded={Boolean(rank)}>
            {rank ? Humanize.compactInteger(rank, 1) : "rank"}
          </ExtendedText>
        </Center>
      );
  }
};
