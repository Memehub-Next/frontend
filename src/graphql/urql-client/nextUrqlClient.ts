import { devtoolsExchange } from "@urql/devtools";
import { requestPolicyExchange } from "@urql/exchange-request-policy";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";
import { getSubscriptionExchange } from ".";
import { errorExchange } from "./index";
import { normalizedCache } from "./normalizedCache";

export const nextUrqlClient: NextUrqlClientConfig = (ssrExchange, ctx) => ({
  url: process.env.NEXT_PUBLIC_GQL_URL,
  fetchOptions: { credentials: "include" as const, headers: { cookie: ctx?.req?.headers.cookie ?? "" } },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    requestPolicyExchange({}),
    normalizedCache,
    errorExchange,
    ssrExchange,
    // persistedFetchExchange({}),
    ...getSubscriptionExchange(),
    fetchExchange,
  ],
});
