import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import deepEqual from "deep-equal";
import { v4 } from "uuid";
import { UpdateResolvers } from "./updateResolvers";

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
    LeaderboardDTO: () => v4().toString(),
    SeasonSummaryDTO: () => v4().toString(),
  },
  resolvers: {
    Query: {
      randomRedditMemes: Pagination("RedditMemePDTO"),
      userRedditBetsPaginated: Pagination("RedditBetPDTO"),
    },
  },
  updates: UpdateResolvers.updates,
});
