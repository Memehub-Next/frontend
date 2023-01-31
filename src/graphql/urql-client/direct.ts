import { createClient } from "@urql/core";
import { devtoolsExchange } from "@urql/devtools";
import { requestPolicyExchange } from "@urql/exchange-request-policy";
import { dedupExchange, fetchExchange } from "urql";
import { errorExchange } from ".";
import { normalizedCache } from "./normalizedCache";

export const urqlClient = (headers: any = {}) =>
  createClient({
    url: process.env.NEXT_PUBLIC_GQL_URL,
    fetchOptions: { credentials: "include" as const, headers },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      requestPolicyExchange({}),
      normalizedCache,
      errorExchange,
      // persistedFetchExchange({}),
      // ...getSubscriptionExchange(),
      fetchExchange,
    ],
  });
