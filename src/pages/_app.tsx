import "symbol-observable";

import { ChakraProvider } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "easy-peasy";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { GlobalStore } from "../store/global.store";
import theme from "../theme";

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps: { ...props } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <StoreProvider store={GlobalStore}>
          <Global styles={GlobalStyles} />
          <Component {...props} />
        </StoreProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
