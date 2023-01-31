import { Avatar, AvatarProps, SkeletonCircle } from "@chakra-ui/react";
import { useRedirect } from "../../hooks/useRedirect";

interface AvatarLinkProps extends AvatarProps {
  username?: string;
}

export const AvatarLink: React.FC<AvatarLinkProps> = ({ username, ...avatarProps }) => {
  const redirect = useRedirect();
  return (
    <SkeletonCircle isLoaded={Boolean(username)}>
      <Avatar onClick={redirect(`/profile/${username}`)} border="1px solid white" _hover={{ cursor: "pointer" }} {...avatarProps} />
    </SkeletonCircle>
  );
};
