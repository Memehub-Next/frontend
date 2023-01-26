import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import * as yup from "yup";
import { DoubleColLayout } from "../../../components/layout/doubleColLayout";
import { Profile } from "../../../components/user/Profile";
import { getQueryParamsProps } from "../../../core/getProps/getServerSideQueryParams";
import { nextUrqlClient } from "../../../graphql/urql-client/nextUrqlClient";

const queryParamSchema = yup.object({
  userId: yup.string().uuid().required(),
});

interface PageProps extends yup.InferType<typeof queryParamSchema> {}

export const getServerSideProps = getQueryParamsProps(queryParamSchema);

const Page: NextPage<PageProps> = ({ userId }) => {
  return (
    <DoubleColLayout>
      <Profile userId={userId} />
    </DoubleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient, { ssr: false })(Page);
