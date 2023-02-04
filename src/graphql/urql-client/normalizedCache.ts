import { createStandaloneToast } from "@chakra-ui/react";
import { Cache, cacheExchange, ResolveInfo, Resolver } from "@urql/exchange-graphcache";
import deepEqual from "deep-equal";
import Router from "next/router";
import { v4 } from "uuid";
import {
  HiveLoginMutation,
  HiveLoginMutationVariables,
  LogoutMutationVariables,
  MeDocument,
  MeQuery,
  PlaceBetMutation,
  PlaceBetMutationVariables,
  RedditMemeFragment,
} from "../urql-codegen";
import { LogoutMutation } from "../urql-codegen/index";
import { RedditMemeFragmentDoc } from "./../urql-codegen/index";

const { toast } = createStandaloneToast();

const Pagination =
  (__typename: string): Resolver =>
  (_parent, fieldArgs, cache, info) => {
    const { parentKey, fieldName } = info;
    const currentKey = cache.keyOfField(fieldName, fieldArgs);
    if (!currentKey) return { __typename, hasMore: false, items: [] };
    info.partial = !cache.resolve(parentKey, currentKey);
    const { skip, take, cursor, ...originalFieldArgs } = fieldArgs;
    const fieldInfos = cache.inspectFields(parentKey).filter((query) => {
      if (query.fieldName !== fieldName || !query.arguments) return false;
      const { skip, take, cursor, ...comparableFieldArgs } = query.arguments;
      return deepEqual(originalFieldArgs, comparableFieldArgs);
    });
    if (!fieldInfos.length) return { __typename, hasMore: false, items: [] };
    const keys = fieldInfos.map((fi) => cache.resolve(parentKey, fi.fieldKey) as string);
    const items = keys.reduce((data, key) => data.concat(cache.resolve(key, "items") as any[]), [] as any[]);
    const hasMore = keys.reduce((hasMore, key) => hasMore && (cache.resolve(key, "hasMore") as boolean), true);
    return { __typename, hasMore, items };
  };

export const normalizedCache = cacheExchange({
  keys: {
    RedditMemePDTO: () => v4().toString(),
    RedditBetPDTO: () => v4().toString(),
    LeaderDTO: () => v4().toString(),
    MyLeaderboardsDTO: () => v4().toString(),
    AllLeaderboardsDTO: () => v4().toString(),
    LeaderboardPDTO: () => v4().toString(),
    SeasonSummaryDTO: () => v4().toString(),
    PairPriceDTO: () => v4().toString(),

    UserEntity: (user) => user.username as string,
  },
  resolvers: {
    Query: {
      userRedditBetsPaginated: Pagination("RedditBetPDTO"),
      leaderboard: Pagination("LeaderboardPDTO"),
    },
  },
  updates: {
    Mutation: {
      logout: async (_parent: LogoutMutation, _fieldArgs: LogoutMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.invalidate("Query");
        await Router.push("/auth/login");
      },
      hiveLogin: async (parent: HiveLoginMutation, _args: HiveLoginMutationVariables, cache: Cache, _info: ResolveInfo) => {
        cache.invalidate("Query");
        cache.updateQuery<MeQuery>({ query: MeDocument }, (_data) => ({ me: parent.hiveLogin }));
        await Router.push("/");
      },
      placeBet: (parent: PlaceBetMutation, _args: PlaceBetMutationVariables, cache: Cache, _info: ResolveInfo) => {
        console.log("updating cache");
        cache.updateQuery<MeQuery>({ query: MeDocument }, (data) => {
          const user = data?.me;
          if (!user) return data;
          const { profitLoss } = parent.placeBet;
          user.gbp += profitLoss;
          if (profitLoss > 0) toast({ title: "Nice Bet!", status: "success", description: `You won ${profitLoss} GBP!` });
          else toast({ title: "Oh No!", status: "warning", description: `You lost ${profitLoss} GBP :(` });
          return { me: user };
        });
        const meme = cache.readFragment<RedditMemeFragment>(RedditMemeFragmentDoc, {
          id: parent.placeBet.redditMemeId,
          __typename: "RedditMemeEntity",
        });
        if (!meme) {
          console.log("where meme?");
          throw new Error("where meme?");
        }
        console.log(`cache redditmemeId: ${parent.placeBet.redditMemeId}`);
        meme.redditBet = parent.placeBet;
        cache.writeFragment(RedditMemeFragmentDoc, meme);
      },
    },
  },
});
