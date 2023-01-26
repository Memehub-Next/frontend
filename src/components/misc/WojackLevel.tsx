import { BadgeProps, Image } from "@chakra-ui/react";
import { useWojakLevelQuery } from "../../graphql/urql-codegen";
import { ExtendedBadge } from "../chakra/ExtendedBadge";

interface WojakLevelProps extends BadgeProps {
  username?: string;
  wojakLevel?: number;
}

export const WojakLevel: React.FC<WojakLevelProps> = ({ username, wojakLevel, ...badgeProps }) => {
  const [{ data }] = useWojakLevelQuery({ variables: { username: username || "" }, pause: Boolean(!username || wojakLevel) });
  return (
    <ExtendedBadge
      example="Level 24"
      isLoaded={Boolean(wojakLevel) || typeof data?.wojakLevel !== "undefined"}
      label={<Image h="10rem" src={`/wojak/${wojakLevel ?? data?.wojakLevel}.png`} />}
      {...badgeProps}
    >
      {`Level ${wojakLevel ?? data?.wojakLevel}`}
    </ExtendedBadge>
  );
};
