import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Avatar, Button, ButtonProps, Image, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRedirect } from "../../../core/hooks/utils/useRedirect";
import { DEFAULT_AVATAR } from "../../../core/utils/constants";
import { useLogoutMutation, useMeQuery } from "../../../graphql/urql-codegen";
import { ExtendedText } from "../../chakra/ExtendedText";

export const LoginButton: React.FC<ButtonProps> = (buttonProps) => {
  const redirect = useRedirect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useMeQuery();
  const [, logoutFN] = useLogoutMutation();
  return fetching || !data?.me ? (
    <Button onClick={redirect("/auth/login")} {...buttonProps}>
      <Image h="15px" mr={3} src="/icons/person.png" />
      <ExtendedText example="memehub" isLoaded={!fetching}>
        Login
      </ExtendedText>
    </Button>
  ) : (
    <Box>
      <Menu isLazy isOpen={isOpen}>
        <MenuButton
          isActive={isOpen}
          as={Button}
          rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          {...buttonProps}
        >
          <HStack _hover={{ cursor: "pointer" }}>
            <Avatar size="xs" src={data?.me?.avatar || DEFAULT_AVATAR} />
            <Text noOfLines={1}>{data!.me!.username}</Text>
          </HStack>
        </MenuButton>
        <MenuList rounded="none" p={0} onMouseEnter={onOpen} onMouseLeave={onClose}>
          {[
            { label: "Profile", onClick: redirect(`/user/profile/${data!.me!.id}`), Icon: BsFillPersonFill },
            { label: "Logout", onClick: () => logoutFN({}), Icon: RiLogoutBoxRLine },
          ].map(({ label, Icon, onClick }, idx) => (
            <MenuItem
              key={idx}
              as={HStack}
              spacing={4}
              onClick={onClick}
              _focus={{}}
              _hover={{ cursor: "pointer", backgroundColor: "gray.800" }}
            >
              <Icon />
              <Text>{label}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
