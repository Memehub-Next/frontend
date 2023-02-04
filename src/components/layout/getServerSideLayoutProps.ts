import { GetServerSidePropsContext, PreviewData } from "next";
import { initUrqlClient } from "next-urql";
import { ParsedUrlQuery } from "querystring";
import { ssrExchange } from "urql";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import {
  AllLeaderboardsDocument,
  AllLeaderboardsQuery,
  AllLeaderboardsQueryVariables,
  GetCryptoPricesDocument,
  GetCryptoPricesQuery,
  GetCryptoPricesQueryVariables,
  GetCurrentSeasonIdDocument,
  GetCurrentSeasonIdQuery,
  GetCurrentSeasonIdQueryVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  MyLeaderboardsDocument,
  MyLeaderboardsQuery,
  MyLeaderboardsQueryVariables,
} from "../../graphql/urql-codegen";

export enum ELayout {
  DoubleColumn = "DoubleColumn",
  SingleColumn = "SingleColumn",
}

export const getServerSideLayoutProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, eLayout: ELayout) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(nextUrqlClient(ssrCache, ctx as any), false);
  if (!client) throw new Error("where URQL client?");
  const meQueyResp = await client.query<MeQuery, MeQueryVariables>(MeDocument, {}).toPromise();
  const me = meQueyResp.data?.me;
  const seasonIdResp = await client
    .query<GetCurrentSeasonIdQuery, GetCurrentSeasonIdQueryVariables>(GetCurrentSeasonIdDocument, {})
    .toPromise();
  const seasonId = seasonIdResp.data?.getCurrentSeasonId;
  if (!seasonId) throw new Error("what season");
  if (eLayout === ELayout.DoubleColumn) {
    await client.query<AllLeaderboardsQuery, AllLeaderboardsQueryVariables>(AllLeaderboardsDocument, { take: 3 }).toPromise();
    await client.query<MyLeaderboardsQuery, MyLeaderboardsQueryVariables>(MyLeaderboardsDocument, {}).toPromise();
    await client
      .query<GetCryptoPricesQuery, GetCryptoPricesQueryVariables>(GetCryptoPricesDocument, {
        pairs: [
          { base: "HIVE", quote: "USD" },
          { base: "HBD", quote: "USD" },
          { base: "BTC", quote: "USD" },
        ],
      })
      .toPromise();
  }
  return { ssrCache, client, me, seasonId };
};
