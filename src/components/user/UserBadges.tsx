import { HStack, StackProps } from "@chakra-ui/react";
import { EUserRole, UserFragment } from "../../graphql/urql-codegen";
import { ExtendedBadge } from "../chakra/ExtendedBadge";
import { WojakLevel } from "../misc/WojackLevel";

interface UserBadgesProps extends StackProps {
  user?: UserFragment;
}

export const UserBadges: React.FC<UserBadgesProps> = ({ user, ...stackProps }) => (
  <HStack {...stackProps}>
    <ExtendedBadge
      example="OG"
      isLoaded={Boolean(user?.roles)}
      isNull={!user?.roles.includes(EUserRole.Og)}
      fontSize={10}
      colorScheme="blue"
    >
      {EUserRole.Og}
    </ExtendedBadge>
    <WojakLevel fontSize={10} wojakLevel={user?.wojakLevel} />
  </HStack>
);
