import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, HStack, Link, Text } from "@chakra-ui/layout";
import { Avatar, Button, ButtonProps, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useGetCurrentSeasonIdQuery, useLogoutMutation, useMeQuery } from "../../graphql/urql-codegen";
import { DEFAULT_AVATAR } from "../../utils/constants";

export const NavBar: React.FC = () => {
  const router = useRouter();
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
            <MenuItem onClick={() => router.push("/trading")} _focus={{ bg: "black", color: "white" }} color="white">
              <AiOutlineStock />
              <Text>Stonks</Text>
            </MenuItem>
            <MenuItem _focus={{ bg: "black", color: "white" }} color="white">
              <FaDiscord />
              <Text>Discord</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Image _hover={{ cursor: "pointer" }} src="/logos/main-logo.png" h="35px" onClick={() => router.push("/")} />
      <HStack display={{ base: "none", sm: "none", md: "none", lg: "flex", xl: "flex" }} spacing={3}>
        <Tooltip shouldWrapChildren label={`Season ${data?.getCurrentSeasonId}`}>
          <Button size="xs" onClick={() => router.push("/trading")}>
            <HStack>
              <AiOutlineStock />
              <Text>Stonks</Text>
            </HStack>
          </Button>
        </Tooltip>
        <Button as={Link} href="https://discord.gg/QAcbE7Y" target="_blank" size="xs">
          <HStack>
            <FaDiscord />
            <Text>Discord</Text>
          </HStack>
        </Button>
      </HStack>
      <LoginButton />
    </Flex>
  );
};

const LoginButton: React.FC<ButtonProps> = () => {
  const router = useRouter();
  const [{ data }] = useMeQuery();
  const [, logoutFN] = useLogoutMutation();
  return !data?.me ? (
    <Button size="sm" onClick={() => router.push("/auth/login")}>
      <BsFillPersonFill />
      <Text ml={3} noOfLines={1}>
        Login
      </Text>
    </Button>
  ) : (
    <HStack>
      <Button size="xs" variant="icon" fontWeight="bold">
        {data?.me.gbp} GBP
      </Button>
      <Button size="sm" onClick={() => router.push(`/profile/${data!.me!.username}`)}>
        <HStack _hover={{ cursor: "pointer" }}>
          <Avatar size="xs" src={data?.me?.avatar || DEFAULT_AVATAR} />
          <Text noOfLines={1}>{data!.me!.username}</Text>
        </HStack>
      </Button>
      <Button size="sm" onClick={() => logoutFN({})}>
        <RiLogoutBoxRLine />
      </Button>
    </HStack>
  );
};
