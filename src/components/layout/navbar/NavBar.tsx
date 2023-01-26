import { Flex, HStack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { FaBullhorn, FaDiscord } from "react-icons/fa";
import { MdOutlineImage, MdOutlineImagesearchRoller } from "react-icons/md";
import { RiMedalLine } from "react-icons/ri";
import { useRedirect } from "../../../core/hooks/utils/useRedirect";
import { useGetCurrentSeasonIdQuery } from "../../../graphql/urql-codegen";
import { ExtendedButton } from "../../chakra/ExtendedButton";
import { CartButton } from "./CartButton";
import { LoginButton } from "./LoginButton";
import { NotificationButton } from "./NotificationButton";

export const NavBar: React.FC = React.memo(() => {
  const redirect = useRedirect();
  const [{ data }] = useGetCurrentSeasonIdQuery();
  return (
    <Flex
      position="fixed"
      top={0}
      zIndex={100}
      w="100vw"
      h="10vh"
      bg="black"
      borderBottom="1px solid gray"
      justifyContent="space-between"
      alignItems="center"
      px={4}
    >
      <Image _hover={{ cursor: "pointer" }} src="/logos/main-logo.png" h="35px" onClick={redirect("/")} />
      <HStack spacing={3}>
        {[
          { text: "Search", Icon: BiSearchAlt, onClick: redirect("/search") },
          { text: "Memes", Icon: MdOutlineImage, onClick: redirect("/meme") },
          { text: "Templates", Icon: MdOutlineImagesearchRoller, onClick: redirect("/template/browse") },
          { text: "Contests", Icon: RiMedalLine, onClick: redirect("/contest/browse") },
          { text: "Stonks", Icon: AiOutlineStock, onClick: redirect("/seasons/trading"), label: `Season ${data?.getCurrentSeasonId}` },
          { text: "Discord", Icon: FaDiscord },
          { text: "Feedback", Icon: FaBullhorn, onClick: redirect("/about/feedback") },
        ].map(({ text, Icon, onClick, label }, idx) => (
          <ExtendedButton key={idx} label={label} size="xs" isLoaded={true} onClick={onClick}>
            <HStack>
              <Icon />
              <Text>{text}</Text>
            </HStack>
          </ExtendedButton>
        ))}
      </HStack>
      <HStack>
        <CartButton />
        <LoginButton size="sm" />
        <NotificationButton />
      </HStack>
    </Flex>
  );
});
