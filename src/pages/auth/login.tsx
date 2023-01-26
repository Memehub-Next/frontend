import { Button, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import * as yup from "yup";
import InputField from "../../components/formik/InputField";
import { SingleColLayout } from "../../components/layout/singleColLayout";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import { useHiveLoginMutation } from "../../graphql/urql-codegen";

const validationSchema = yup.object({
  username: yup.string().min(1).required(),
});
const initialValues: yup.InferType<typeof validationSchema> = { username: "" };

const Page: NextPage = () => {
  const [, loginFN] = useHiveLoginMutation();
  return (
    <SingleColLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ username }) => loginFN({ username, signedMessage: "", message: "" })}
      >
        {({ isSubmitting }) => (
          <VStack as={Form} w={{ base: "90%", sm: "50%", md: "50%", lg: "20%", xl: "20%" }}>
            <Text>Login</Text>
            <InputField placeholder="Username" name="username" />
            <Flex w="100%" justifyContent="space-between" alignItems="center">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
              <Link href="/auth/register">Sign Up</Link>
            </Flex>
            <Button w="100%" isLoading={isSubmitting} type="submit">
              Submit
            </Button>
          </VStack>
        )}
      </Formik>
    </SingleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient, { ssr: false })(Page);
