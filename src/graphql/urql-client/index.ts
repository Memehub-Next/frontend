import { createStandaloneToast } from "@chakra-ui/react";
import { createClient as createWSClient } from "graphql-ws";
import Router from "next/router";
import { CombinedError, Exchange, subscriptionExchange } from "urql";
import { pipe, tap } from "wonka";
import { Environment } from "../../utils/environment";

export const errorHandler = (error: CombinedError | undefined) => {
  switch (true) {
    case error?.message.includes("Forbidden resource"):
      Router.replace("/auth/login");
      break;
    case error?.message.includes("Unauthorized"):
      Router.replace("/auth/login");
      const { toast } = createStandaloneToast();
      toast({ status: "error", title: "Unauthorized" });
      break;
    case Boolean(error?.message):
      console.log("error?.message", error?.message);
      throw error;
  }
};

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) =>
    pipe(
      forward(ops$),
      tap(({ error }) => errorHandler(error))
    );

export const getSubscriptionExchange = (): Exchange[] => {
  if (Environment.isServer()) return [];
  const subscriptionClient = createWSClient({ url: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL });
  return [
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({ unsubscribe: subscriptionClient.subscribe(operation, sink) }),
      }),
    }),
  ];
};
