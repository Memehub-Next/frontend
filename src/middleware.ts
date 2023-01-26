import { NextFetchEvent, NextRequest } from "next/server";

export const middleware = async (_req: NextRequest, _ev: NextFetchEvent) => {
  // const { data } = await urqlClient({ cookie: [req.headers.get("cookie")] })
  //   .query<MeQuery>(MeDocument, {}, { requestPolicy: "network-only" })
  //   .toPromise();
  // if (!data?.me) return NextResponse.redirect("/");
  // else return NextResponse.next();
};

export const config = { matcher: [] };
