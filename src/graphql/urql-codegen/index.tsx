import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum ELeaderboard {
  BestTrade = 'BestTrade',
  Daily = 'Daily',
  Ever = 'Ever',
  LargestYolo = 'LargestYolo',
  Season = 'Season',
  Weekly = 'Weekly'
}

export enum EPositionSide {
  Buy = 'Buy',
  Sell = 'Sell'
}

export enum ERedditBetOrder {
  BetSize = 'betSize',
  CreatedAt = 'createdAt',
  Percentile = 'percentile',
  ProfitLoss = 'profitLoss',
  Target = 'target'
}

export enum ETradedOrder {
  Best = 'Best',
  Latest = 'Latest',
  Worst = 'Worst'
}

export enum EUserRole {
  Admin = 'Admin',
  Hive = 'Hive'
}

export type LeaderboardDto = {
  __typename?: 'LeaderboardDTO';
  avatar?: Maybe<Scalars['String']>;
  profitLoss: Scalars['Int'];
  rank: Scalars['Int'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHiveAcct: Scalars['Boolean'];
  hiveLogin: UserEntity;
  login: UserEntity;
  logout: Scalars['Boolean'];
  placeBet: RedditBetEntity;
};


export type MutationCreateHiveAcctArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationHiveLoginArgs = {
  message: Scalars['String'];
  signedMessage: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPlaceBetArgs = {
  betSize: Scalars['Int'];
  ePositionSide: EPositionSide;
  redditMemeId: Scalars['String'];
  target?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  gbpBySeason: Scalars['Int'];
  getCurrentSeasonId: Scalars['Int'];
  leaderboard: Array<LeaderboardDto>;
  me?: Maybe<UserEntity>;
  myLeaderboard?: Maybe<LeaderboardDto>;
  myRedditBet?: Maybe<RedditBetEntity>;
  randomRedditMemes: RedditMemePdto;
  seasonSummary?: Maybe<SeasonSummaryDto>;
  totalGbp: Scalars['Int'];
  user?: Maybe<UserEntity>;
  userRedditBets: Array<RedditBetEntity>;
  userRedditBetsPaginated: RedditBetPdto;
  wojakLevel: Scalars['Int'];
};


export type QueryGbpBySeasonArgs = {
  seasonId?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type QueryLeaderboardArgs = {
  eLeaderboard: ELeaderboard;
  seasonId?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryMyLeaderboardArgs = {
  eLeaderboard: ELeaderboard;
  seasonId?: InputMaybe<Scalars['Int']>;
};


export type QueryMyRedditBetArgs = {
  redditMemeId: Scalars['String'];
  seasonId?: InputMaybe<Scalars['Int']>;
};


export type QueryRandomRedditMemesArgs = {
  eTradedOrder?: InputMaybe<ETradedOrder>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  traded: Scalars['Boolean'];
};


export type QuerySeasonSummaryArgs = {
  seasonId?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type QueryTotalGbpArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserRedditBetsArgs = {
  ePositionSide?: InputMaybe<EPositionSide>;
  isYolo?: InputMaybe<Scalars['Boolean']>;
  seasonId?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
  username: Scalars['String'];
};


export type QueryUserRedditBetsPaginatedArgs = {
  ePositionSide?: InputMaybe<EPositionSide>;
  eRedditBetOrder: ERedditBetOrder;
  isASC: Scalars['Boolean'];
  isYolo?: InputMaybe<Scalars['Boolean']>;
  seasonId?: InputMaybe<Scalars['Int']>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  username: Scalars['String'];
};


export type QueryWojakLevelArgs = {
  username: Scalars['String'];
};

export type RedditBetEntity = {
  __typename?: 'RedditBetEntity';
  betSize: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isYolo: Scalars['Boolean'];
  meme: RedditMemeEntity;
  percentile: Scalars['Int'];
  profitLoss: Scalars['Int'];
  redditMemeId: Scalars['String'];
  seasonId: Scalars['Int'];
  side: EPositionSide;
  target?: Maybe<Scalars['Int']>;
  username: Scalars['String'];
};

export type RedditBetPdto = {
  __typename?: 'RedditBetPDTO';
  hasMore: Scalars['Boolean'];
  items: Array<RedditBetEntity>;
};

export type RedditMemeEntity = {
  __typename?: 'RedditMemeEntity';
  author: Scalars['String'];
  downvotes: Scalars['Int'];
  id: Scalars['ID'];
  numComments: Scalars['Int'];
  percentile?: Maybe<Scalars['Float']>;
  redditBet?: Maybe<RedditBetEntity>;
  redditId: Scalars['String'];
  subreddit: Scalars['String'];
  title: Scalars['String'];
  upvoteRatio: Scalars['Float'];
  upvotes: Scalars['Int'];
  url: Scalars['String'];
};

export type RedditMemePdto = {
  __typename?: 'RedditMemePDTO';
  hasMore: Scalars['Boolean'];
  items: Array<RedditMemeEntity>;
};

export type SeasonSummaryDto = {
  __typename?: 'SeasonSummaryDTO';
  betSizeAvg: Scalars['Int'];
  numBuys: Scalars['Int'];
  numGoodTrades: Scalars['Int'];
  numIsYolo: Scalars['Int'];
  numTrades: Scalars['Int'];
  percentileAvg: Scalars['Int'];
  profitLossPerTrade: Scalars['Int'];
  profitLossTotal: Scalars['Int'];
  targetAvg: Scalars['Int'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  gbp: Scalars['Int'];
  roles: Array<EUserRole>;
  username: Scalars['String'];
  wojakLevel: Scalars['Int'];
};

export type WojakLevelQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type WojakLevelQuery = { __typename?: 'Query', wojakLevel: number };

export type TotalGbpQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type TotalGbpQuery = { __typename?: 'Query', totalGbp: number };

export type GbpBySeasonQueryVariables = Exact<{
  username: Scalars['String'];
  seasonId: Scalars['Int'];
}>;


export type GbpBySeasonQuery = { __typename?: 'Query', gbpBySeason: number };

export type LeaderFragment = { __typename?: 'LeaderboardDTO', username: string, avatar?: string | null, profitLoss: number, rank: number };

export type LeaderboardQueryVariables = Exact<{
  eLeaderboard: ELeaderboard;
  seasonId?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type LeaderboardQuery = { __typename?: 'Query', leaderboard: Array<{ __typename?: 'LeaderboardDTO', username: string, avatar?: string | null, profitLoss: number, rank: number }> };

export type MyLeaderboardQueryVariables = Exact<{
  eLeaderboard: ELeaderboard;
  seasonId?: InputMaybe<Scalars['Int']>;
}>;


export type MyLeaderboardQuery = { __typename?: 'Query', myLeaderboard?: { __typename?: 'LeaderboardDTO', username: string, avatar?: string | null, profitLoss: number, rank: number } | null };

export type RedditBetFragment = { __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide };

export type RedditBetMemeFragment = { __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide, meme: { __typename?: 'RedditMemeEntity', id: string, url: string } };

export type PaginatedRedditBetsFragment = { __typename?: 'RedditBetPDTO', hasMore: boolean, items: Array<{ __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide, meme: { __typename?: 'RedditMemeEntity', id: string, url: string } }> };

export type UserRedditBetsPaginatedQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  eRedditBetOrder: ERedditBetOrder;
  username: Scalars['String'];
  isASC: Scalars['Boolean'];
  isYolo?: InputMaybe<Scalars['Boolean']>;
  seasonId?: InputMaybe<Scalars['Int']>;
  ePositionSide?: InputMaybe<EPositionSide>;
}>;


export type UserRedditBetsPaginatedQuery = { __typename?: 'Query', userRedditBetsPaginated: { __typename?: 'RedditBetPDTO', hasMore: boolean, items: Array<{ __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide, meme: { __typename?: 'RedditMemeEntity', id: string, url: string } }> } };

export type UserRedditBetsQueryVariables = Exact<{
  take: Scalars['Int'];
  username: Scalars['String'];
  isYolo?: InputMaybe<Scalars['Boolean']>;
  seasonId?: InputMaybe<Scalars['Int']>;
  ePositionSide?: InputMaybe<EPositionSide>;
}>;


export type UserRedditBetsQuery = { __typename?: 'Query', userRedditBets: Array<{ __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide }> };

export type MyRedditBetQueryVariables = Exact<{
  redditMemeId: Scalars['String'];
  seasonId?: InputMaybe<Scalars['Int']>;
}>;


export type MyRedditBetQuery = { __typename?: 'Query', myRedditBet?: { __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide } | null };

export type PlaceBetMutationVariables = Exact<{
  betSize: Scalars['Int'];
  redditMemeId: Scalars['String'];
  ePositionSide: EPositionSide;
  target?: InputMaybe<Scalars['Int']>;
}>;


export type PlaceBetMutation = { __typename?: 'Mutation', placeBet: { __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide } };

export type RedditMemeFragment = { __typename?: 'RedditMemeEntity', id: string, title: string, subreddit: string, url: string, redditId: string, redditBet?: { __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide } | null };

export type PaginatedRedditMemesFragment = { __typename?: 'RedditMemePDTO', hasMore: boolean, items: Array<{ __typename?: 'RedditMemeEntity', id: string, title: string, subreddit: string, url: string, redditId: string, redditBet?: { __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide } | null }> };

export type RandomRedditMemesQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  traded: Scalars['Boolean'];
  eTradedOrder?: InputMaybe<ETradedOrder>;
}>;


export type RandomRedditMemesQuery = { __typename?: 'Query', randomRedditMemes: { __typename?: 'RedditMemePDTO', hasMore: boolean, items: Array<{ __typename?: 'RedditMemeEntity', id: string, title: string, subreddit: string, url: string, redditId: string, redditBet?: { __typename?: 'RedditBetEntity', id: string, redditMemeId: string, betSize: number, target?: number | null, percentile: number, username: string, createdAt: any, profitLoss: number, isYolo: boolean, side: EPositionSide } | null }> } };

export type GetCurrentSeasonIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentSeasonIdQuery = { __typename?: 'Query', getCurrentSeasonId: number };

export type SeasonSummaryFragment = { __typename?: 'SeasonSummaryDTO', numTrades: number, numGoodTrades: number, profitLossTotal: number, profitLossPerTrade: number, numIsYolo: number, targetAvg: number, percentileAvg: number, betSizeAvg: number, numBuys: number };

export type SeasonSummaryQueryVariables = Exact<{
  username: Scalars['String'];
  seasonId?: InputMaybe<Scalars['Int']>;
}>;


export type SeasonSummaryQuery = { __typename?: 'Query', seasonSummary?: { __typename?: 'SeasonSummaryDTO', numTrades: number, numGoodTrades: number, profitLossTotal: number, profitLossPerTrade: number, numIsYolo: number, targetAvg: number, percentileAvg: number, betSizeAvg: number, numBuys: number } | null };

export type UserFragment = { __typename?: 'UserEntity', username: string, roles: Array<EUserRole>, gbp: number, wojakLevel: number };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserEntity', username: string, roles: Array<EUserRole>, gbp: number, wojakLevel: number } | null };

export type CreateHiveAcctMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateHiveAcctMutation = { __typename?: 'Mutation', createHiveAcct: boolean };

export type HiveLoginMutationVariables = Exact<{
  message: Scalars['String'];
  signedMessage: Scalars['String'];
  username: Scalars['String'];
}>;


export type HiveLoginMutation = { __typename?: 'Mutation', hiveLogin: { __typename?: 'UserEntity', username: string, roles: Array<EUserRole>, gbp: number, wojakLevel: number } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export const LeaderFragmentDoc = gql`
    fragment leader on LeaderboardDTO {
  username
  avatar
  profitLoss
  rank
}
    `;
export const RedditBetFragmentDoc = gql`
    fragment redditBet on RedditBetEntity {
  id
  redditMemeId
  betSize
  target
  percentile
  username
  createdAt
  profitLoss
  isYolo
  side
}
    `;
export const RedditBetMemeFragmentDoc = gql`
    fragment redditBetMeme on RedditBetEntity {
  ...redditBet
  meme {
    id
    url
  }
}
    ${RedditBetFragmentDoc}`;
export const PaginatedRedditBetsFragmentDoc = gql`
    fragment paginatedRedditBets on RedditBetPDTO {
  items {
    ...redditBetMeme
  }
  hasMore
}
    ${RedditBetMemeFragmentDoc}`;
export const RedditMemeFragmentDoc = gql`
    fragment redditMeme on RedditMemeEntity {
  id
  title
  subreddit
  url
  redditId
  redditBet {
    ...redditBet
  }
}
    ${RedditBetFragmentDoc}`;
export const PaginatedRedditMemesFragmentDoc = gql`
    fragment paginatedRedditMemes on RedditMemePDTO {
  items {
    ...redditMeme
  }
  hasMore
}
    ${RedditMemeFragmentDoc}`;
export const SeasonSummaryFragmentDoc = gql`
    fragment seasonSummary on SeasonSummaryDTO {
  numTrades
  numGoodTrades
  profitLossTotal
  profitLossPerTrade
  numIsYolo
  targetAvg
  percentileAvg
  betSizeAvg
  numBuys
}
    `;
export const UserFragmentDoc = gql`
    fragment user on UserEntity {
  username
  roles
  gbp
  wojakLevel
}
    `;
export const WojakLevelDocument = gql`
    query WojakLevel($username: String!) {
  wojakLevel(username: $username)
}
    `;

export function useWojakLevelQuery(options: Omit<Urql.UseQueryArgs<WojakLevelQueryVariables>, 'query'>) {
  return Urql.useQuery<WojakLevelQuery, WojakLevelQueryVariables>({ query: WojakLevelDocument, ...options });
};
export const TotalGbpDocument = gql`
    query TotalGbp($username: String!) {
  totalGbp(username: $username)
}
    `;

export function useTotalGbpQuery(options: Omit<Urql.UseQueryArgs<TotalGbpQueryVariables>, 'query'>) {
  return Urql.useQuery<TotalGbpQuery, TotalGbpQueryVariables>({ query: TotalGbpDocument, ...options });
};
export const GbpBySeasonDocument = gql`
    query GbpBySeason($username: String!, $seasonId: Int!) {
  gbpBySeason(username: $username, seasonId: $seasonId)
}
    `;

export function useGbpBySeasonQuery(options: Omit<Urql.UseQueryArgs<GbpBySeasonQueryVariables>, 'query'>) {
  return Urql.useQuery<GbpBySeasonQuery, GbpBySeasonQueryVariables>({ query: GbpBySeasonDocument, ...options });
};
export const LeaderboardDocument = gql`
    query Leaderboard($eLeaderboard: ELeaderboard!, $seasonId: Int, $take: Int) {
  leaderboard(eLeaderboard: $eLeaderboard, seasonId: $seasonId, take: $take) {
    ...leader
  }
}
    ${LeaderFragmentDoc}`;

export function useLeaderboardQuery(options: Omit<Urql.UseQueryArgs<LeaderboardQueryVariables>, 'query'>) {
  return Urql.useQuery<LeaderboardQuery, LeaderboardQueryVariables>({ query: LeaderboardDocument, ...options });
};
export const MyLeaderboardDocument = gql`
    query MyLeaderboard($eLeaderboard: ELeaderboard!, $seasonId: Int) {
  myLeaderboard(eLeaderboard: $eLeaderboard, seasonId: $seasonId) {
    ...leader
  }
}
    ${LeaderFragmentDoc}`;

export function useMyLeaderboardQuery(options: Omit<Urql.UseQueryArgs<MyLeaderboardQueryVariables>, 'query'>) {
  return Urql.useQuery<MyLeaderboardQuery, MyLeaderboardQueryVariables>({ query: MyLeaderboardDocument, ...options });
};
export const UserRedditBetsPaginatedDocument = gql`
    query UserRedditBetsPaginated($take: Int!, $skip: Int!, $eRedditBetOrder: ERedditBetOrder!, $username: String!, $isASC: Boolean!, $isYolo: Boolean, $seasonId: Int, $ePositionSide: EPositionSide) {
  userRedditBetsPaginated(
    take: $take
    skip: $skip
    seasonId: $seasonId
    eRedditBetOrder: $eRedditBetOrder
    username: $username
    ePositionSide: $ePositionSide
    isASC: $isASC
    isYolo: $isYolo
  ) {
    ...paginatedRedditBets
  }
}
    ${PaginatedRedditBetsFragmentDoc}`;

export function useUserRedditBetsPaginatedQuery(options: Omit<Urql.UseQueryArgs<UserRedditBetsPaginatedQueryVariables>, 'query'>) {
  return Urql.useQuery<UserRedditBetsPaginatedQuery, UserRedditBetsPaginatedQueryVariables>({ query: UserRedditBetsPaginatedDocument, ...options });
};
export const UserRedditBetsDocument = gql`
    query UserRedditBets($take: Int!, $username: String!, $isYolo: Boolean, $seasonId: Int, $ePositionSide: EPositionSide) {
  userRedditBets(
    take: $take
    seasonId: $seasonId
    username: $username
    ePositionSide: $ePositionSide
    isYolo: $isYolo
  ) {
    ...redditBet
  }
}
    ${RedditBetFragmentDoc}`;

export function useUserRedditBetsQuery(options: Omit<Urql.UseQueryArgs<UserRedditBetsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserRedditBetsQuery, UserRedditBetsQueryVariables>({ query: UserRedditBetsDocument, ...options });
};
export const MyRedditBetDocument = gql`
    query MyRedditBet($redditMemeId: String!, $seasonId: Int) {
  myRedditBet(redditMemeId: $redditMemeId, seasonId: $seasonId) {
    ...redditBet
  }
}
    ${RedditBetFragmentDoc}`;

export function useMyRedditBetQuery(options: Omit<Urql.UseQueryArgs<MyRedditBetQueryVariables>, 'query'>) {
  return Urql.useQuery<MyRedditBetQuery, MyRedditBetQueryVariables>({ query: MyRedditBetDocument, ...options });
};
export const PlaceBetDocument = gql`
    mutation PlaceBet($betSize: Int!, $redditMemeId: String!, $ePositionSide: EPositionSide!, $target: Int) {
  placeBet(
    betSize: $betSize
    redditMemeId: $redditMemeId
    ePositionSide: $ePositionSide
    target: $target
  ) {
    ...redditBet
  }
}
    ${RedditBetFragmentDoc}`;

export function usePlaceBetMutation() {
  return Urql.useMutation<PlaceBetMutation, PlaceBetMutationVariables>(PlaceBetDocument);
};
export const RandomRedditMemesDocument = gql`
    query RandomRedditMemes($take: Int!, $skip: Int!, $traded: Boolean!, $eTradedOrder: ETradedOrder) {
  randomRedditMemes(
    take: $take
    skip: $skip
    traded: $traded
    eTradedOrder: $eTradedOrder
  ) {
    ...paginatedRedditMemes
  }
}
    ${PaginatedRedditMemesFragmentDoc}`;

export function useRandomRedditMemesQuery(options: Omit<Urql.UseQueryArgs<RandomRedditMemesQueryVariables>, 'query'>) {
  return Urql.useQuery<RandomRedditMemesQuery, RandomRedditMemesQueryVariables>({ query: RandomRedditMemesDocument, ...options });
};
export const GetCurrentSeasonIdDocument = gql`
    query GetCurrentSeasonId {
  getCurrentSeasonId
}
    `;

export function useGetCurrentSeasonIdQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentSeasonIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentSeasonIdQuery, GetCurrentSeasonIdQueryVariables>({ query: GetCurrentSeasonIdDocument, ...options });
};
export const SeasonSummaryDocument = gql`
    query SeasonSummary($username: String!, $seasonId: Int) {
  seasonSummary(username: $username, seasonId: $seasonId) {
    ...seasonSummary
  }
}
    ${SeasonSummaryFragmentDoc}`;

export function useSeasonSummaryQuery(options: Omit<Urql.UseQueryArgs<SeasonSummaryQueryVariables>, 'query'>) {
  return Urql.useQuery<SeasonSummaryQuery, SeasonSummaryQueryVariables>({ query: SeasonSummaryDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...user
  }
}
    ${UserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const CreateHiveAcctDocument = gql`
    mutation CreateHiveAcct($username: String!, $password: String!) {
  createHiveAcct(username: $username, password: $password)
}
    `;

export function useCreateHiveAcctMutation() {
  return Urql.useMutation<CreateHiveAcctMutation, CreateHiveAcctMutationVariables>(CreateHiveAcctDocument);
};
export const HiveLoginDocument = gql`
    mutation HiveLogin($message: String!, $signedMessage: String!, $username: String!) {
  hiveLogin(message: $message, signedMessage: $signedMessage, username: $username) {
    ...user
  }
}
    ${UserFragmentDoc}`;

export function useHiveLoginMutation() {
  return Urql.useMutation<HiveLoginMutation, HiveLoginMutationVariables>(HiveLoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};