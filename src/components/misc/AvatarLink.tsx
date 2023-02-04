import { Avatar, AvatarProps, SkeletonCircle } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface AvatarLinkProps extends AvatarProps {
  username?: string;
}

export const AvatarLink: React.FC<AvatarLinkProps> = ({ username, ...avatarProps }) => {
  const router = useRouter();
  return (
    <SkeletonCircle isLoaded={Boolean(username)}>
      <Avatar
        onClick={() => router.push(`/profile/${username}`)}
        border="1px solid white"
        _hover={{ cursor: "pointer" }}
        {...avatarProps}
      />
    </SkeletonCircle>
  );
};
