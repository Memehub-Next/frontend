import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { components } from "./components";
import { semanticTokens } from "./semanticTokens";

const config: ThemeOverride = {
  semanticTokens,
  components,
  fonts: { mono: `'Menlo', monospace` },
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
  borders: {},
  radii: {},
  shadows: { outline: "none" },
  sizes: {},
  space: {},
  transition: {},
  zIndices: {},
};

const theme = extendTheme(config);

export default theme;
