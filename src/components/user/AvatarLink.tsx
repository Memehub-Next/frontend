import { Avatar, AvatarProps, SkeletonCircle } from "@chakra-ui/react";
import { useRedirect } from "../../core/hooks/useRedirect";

interface AvatarLinkProps extends AvatarProps {
  username?: string;
}

export const AvatarLink: React.FC<AvatarLinkProps> = ({ username, ...avatarProps }) => {
  const redirect = useRedirect();
  return (
    <SkeletonCircle isLoaded={Boolean(username)}>
      <Avatar onClick={redirect(`/user/profile/${username}`)} border="1px solid white" _hover={{ cursor: "pointer" }} {...avatarProps} />
    </SkeletonCircle>
  );
};
