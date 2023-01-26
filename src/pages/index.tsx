import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { DoubleColLayout } from "../components/layout/doubleColLayout";
import { nextUrqlClient } from "../graphql/urql-client/nextUrqlClient";

const Page: NextPage = () => <DoubleColLayout />;
export default withUrqlClient(nextUrqlClient, { ssr: false })(Page);
