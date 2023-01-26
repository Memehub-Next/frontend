import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, HStack, Text } from "@chakra-ui/layout";
import { IconButton, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { FaBullhorn, FaDiscord } from "react-icons/fa";
import { MdOutlineImage, MdOutlineImagesearchRoller } from "react-icons/md";
import { RiMedalLine } from "react-icons/ri";
import { useRedirect } from "../../../core/hooks/utils/useRedirect";
import { useGetCurrentSeasonIdQuery } from "../../../graphql/urql-codegen";
import { ExtendedButton } from "../../chakra/ExtendedButton";
import { LoginButton } from "./LoginButton";
import { NotificationButton } from "./NotificationButton";

export const MobileNavBar: React.FC = React.memo(() => {
  const redirect = useRedirect();
  const [{ data }] = useGetCurrentSeasonIdQuery();
  const MenuData = [
    { text: "Search", Icon: BiSearchAlt, onClick: redirect("/search") },
    { text: "Memes", Icon: MdOutlineImage, onClick: redirect("/meme") },
    { text: "Templates", Icon: MdOutlineImagesearchRoller, onClick: redirect("/template/browse") },
    { text: "Contests", Icon: RiMedalLine, onClick: redirect("/contest/browse") },
    { text: "Stonks", Icon: AiOutlineStock, onClick: redirect("/seasons/trading"), label: `Season ${data?.getCurrentSeasonId}` },
    { text: "Discord", Icon: FaDiscord },
    { text: "Feedback", Icon: FaBullhorn, onClick: redirect("/about/feedback") },
  ];
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
      <HStack display={{ base: "block", sm: "block", md: "block", lg: "none" }} spacing={3}>
        <Menu colorScheme="black">
          <MenuButton
            _expanded={{ bg: "black" }}
            _focus={{ bg: "black", color: "white" }}
            bg="black"
            color="white"
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            {MenuData.map(({ text, Icon, onClick }, idx) => (
              <MenuItem key={idx} onClick={onClick} _focus={{ bg: "black", color: "white" }} color="white">
                <Icon />
                <Text>{text}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>

      <Image _hover={{ cursor: "pointer" }} src="/logos/main-logo.png" h="35px" onClick={redirect("/")} />

      <HStack display={{ base: "none", sm: "none", md: "none", lg: "flex", xl: "flex" }} spacing={3}>
        {MenuData.map(({ text, Icon, onClick, label }, idx) => (
          <ExtendedButton key={idx} label={label} size="xs" isLoaded={true} onClick={onClick}>
            <HStack>
              <Icon />
              <Text>{text}</Text>
            </HStack>
          </ExtendedButton>
        ))}
      </HStack>
      <HStack>
        <LoginButton size="sm" />
        <NotificationButton />
      </HStack>
    </Flex>
  );
});
