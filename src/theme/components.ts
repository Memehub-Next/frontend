import { ThemeComponents } from "@chakra-ui/react";

export const components: ThemeComponents = {
  Menu: {
    parts: ["list"],
    baseStyle: { list: { bg: "black", rounded: "none", p: 0 } },
  },
  Link: {
    baseStyle: { _hover: { textDecoration: "none" } },
  },
  Input: {
    variants: { default: { field: { rounded: "sm", bg: "gray.700" } } },
    defaultProps: { variant: "default" },
  },
  Button: {
    baseStyle: { rounded: "sm" },
    variants: {
      upvote: {
        bg: "white",
        color: "green.500",
        _hover: { bg: "gray.100" },
        _active: { bg: "green.500", color: "white", _hover: { bg: "green.600" } },
      },
      downvote: { color: "red.500", bg: "white", _active: { color: "white", bg: "red.500" } },
      upvoteActive: { bg: "green.500", color: "white", _hover: { bg: "green.600" } },
      downvoteActive: { color: "white", bg: "red.500" },
      icon: { color: "black", bg: "white", _hover: { bg: "gray.100" } },
      selector: {
        bg: "gray.700",
        color: "white",
        _hover: { bg: "gray.500" },
        _active: { bg: "brandLight", color: "white", _hover: { bg: "brandDark" } },
      },
      flag: { bg: "white", color: "black", _active: { bg: "red.500", color: "white" } },
      default: { bg: "brandLight", color: "white", _hover: { bg: "brandDark" } },
    },
    defaultProps: { variant: "default" },
  },
};
