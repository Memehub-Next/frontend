import { GetServerSideProps } from "next";
import { InferType } from "yup";
import ObjectSchema, { ObjectShape } from "yup/lib/object";

type TGetQueryParamsProps = <PageProps extends ObjectShape>(
  schema: ObjectSchema<PageProps>
) => GetServerSideProps<InferType<typeof schema>>;

export const getQueryParamsProps: TGetQueryParamsProps =
  (schema) =>
  async ({ query }) => {
    try {
      return { props: await schema.validate(query, { strict: true }) };
    } catch (error) {
      return { redirect: { permanent: false, destination: "/auth/login" } };
    }
  };
