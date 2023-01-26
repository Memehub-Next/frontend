import { Avatar, HStack, VStack } from "@chakra-ui/react";
import Humanize from "humanize-plus";
import { DEFAULT_AVATAR } from "../../core/utils/constants";
import { useTotalGbpQuery, useUserQuery } from "../../graphql/urql-codegen";
import { ExtendedText } from "../chakra/ExtendedText";
import { WojakLevel } from "../misc/WojackLevel";
import { RedditBetAnalysis } from "../RedditBets/RedditBetAnalysis";

interface ProfileProps {
  username: string;
}

export const Profile: React.FC<ProfileProps> = ({ username }) => {
  const [userResp] = useUserQuery({ variables: { username } });
  const [totalGbpResp] = useTotalGbpQuery({ variables: { username } });
  const user = userResp.data?.user;
  const gbp = totalGbpResp.data?.totalGbp ?? 0;
  return (
    <VStack w="100%">
      <VStack w="100%" spacing={5}>
        <HStack spacing={3}>
          <Avatar size="xl" src={user?.avatar || DEFAULT_AVATAR} />
          <VStack>
            <ExtendedText example="memehub" isLoaded={Boolean(user?.username)} fontSize="xl" fontWeight="bold">
              {user?.username}
            </ExtendedText>
            <ExtendedText example="100 GBP" isLoaded={Boolean(totalGbpResp)}>
              {Humanize.formatNumber(gbp, 0)} GBP
            </ExtendedText>
            <WojakLevel username={username} />
          </VStack>
        </HStack>
        <RedditBetAnalysis username={username} />
      </VStack>
    </VStack>
  );
};
