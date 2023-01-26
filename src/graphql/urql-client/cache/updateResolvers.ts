import { createStandaloneToast } from "@chakra-ui/react";
import { Cache, ResolveInfo, UpdateResolver, UpdatesConfig } from "@urql/exchange-graphcache";
import Router from "next/router";
import {
  HiveLoginMutation,
  HiveLoginMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  LogoutMutationVariables,
  MeDocument,
  MeQuery,
  PlaceBetMutation,
  PlaceBetMutationVariables,
  RegisterMutation,
  RegisterMutationVariables,
} from "../../urql-codegen";
import { LogoutMutation } from "./../../urql-codegen/index";

const { toast } = createStandaloneToast();

export class UpdateResolvers {
  static placeBet: UpdateResolver = (parent: PlaceBetMutation, _args: PlaceBetMutationVariables, cache: Cache, _info: ResolveInfo) =>
    cache.updateQuery<MeQuery>({ query: MeDocument }, (data) => {
      const user = data?.me;
      if (!user) return data;
      const { profitLoss } = parent.placeBet;
      user.gbp += profitLoss;
      if (profitLoss > 0) toast({ title: "Nice Bet!", status: "success", description: `You won ${profitLoss} GBP!` });
      else toast({ title: "Oh No!", status: "warning", description: `You lost ${profitLoss} GBP :(` });
      return { me: user };
    });

  static updates: Partial<UpdatesConfig> = {
    Mutation: {
      logout: (_parent: LogoutMutation, _fieldArgs: LogoutMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.invalidate("Query");
        Router.push("/auth/login");
      },
      login: async (parent: LoginMutation, _args: LoginMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.invalidate("Query");
        cache.updateQuery<MeQuery>({ query: MeDocument }, (_data) => ({ me: parent.login }));
        await Router.push("/");
      },
      hiveLogin: (parent: HiveLoginMutation, _args: HiveLoginMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.invalidate("Query");
        cache.updateQuery<MeQuery>({ query: MeDocument }, (_data) => ({ me: parent.hiveLogin }));
      },

      placeBet: UpdateResolvers.placeBet,

      register: async (parent: RegisterMutation, _args: RegisterMutationVariables, _cache: Cache, _info: ResolveInfo) => {
        if (parent.register)
          toast({ status: "success", description: "Registered, please check your email. Potentially in your spam folder." });
      },
    },
  };
}
