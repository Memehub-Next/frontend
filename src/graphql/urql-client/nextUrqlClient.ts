import { devtoolsExchange } from "@urql/devtools";
import { requestPolicyExchange } from "@urql/exchange-request-policy";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";
import { getSubscriptionExchange } from ".";
import { Environment } from "../../utils/environment";
import { normalizedCache } from "./cache/normalizedCache";
import { errorExchange } from "./index";

export const nextUrqlClient: NextUrqlClientConfig = (ssrExchange, ctx) => {
  const headers = Environment.isServer() && ctx?.req?.headers ? ctx.req.headers : (undefined as any);
  return {
    url: process.env.NEXT_PUBLIC_GQL_URL,
    fetchOptions: { credentials: "include" as const, headers },
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
  };
};
