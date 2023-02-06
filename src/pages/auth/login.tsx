import { Button, Divider, HStack, Link, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { getSelectorsByUserAgent } from "react-device-detect";
import { HiRefresh } from "react-icons/hi";
import * as yup from "yup";
import InputField from "../../components/formik/InputField";
import { ELayout, getServerSideLayoutProps } from "../../components/layout/getServerSideLayoutProps";
import { SingleColLayout } from "../../components/layout/singleColLayout";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import { useHiveLoginMutation } from "../../graphql/urql-codegen";
import { HiveKeychain } from "../../hive/hiveKeychain";
import { useHiveKeychain } from "../../hooks/useHiveKeychain";

const validationSchema = yup.object({
  username: yup.string().min(1).required(),
});
const initialValues: yup.InferType<typeof validationSchema> = { username: "" };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userAgent = ctx.req.headers["user-agent"] as string;
  const { isMobile } = getSelectorsByUserAgent(userAgent);
  if (isMobile) return { redirect: { permanent: false, destination: "/about/mobile" } };
  const { ssrCache } = await getServerSideLayoutProps(ctx, ELayout.DoubleColumn);
  return { props: { urqlState: ssrCache.extractData() } };
};

const Page: NextPage = () => {
  const { isInstalled, checkHiveKeychain } = useHiveKeychain();
  const [, loginFN] = useHiveLoginMutation();
  return (
    <SingleColLayout>
      <VStack w="100%" spacing={3}>
        <VStack>
          <Text fontWeight="bold">New Users</Text>
          <Text textAlign="center">You can get started by getting a Hive Blockchain account</Text>
          <Text>and Hive Keychain to get manage logins</Text>
        </VStack>
        <HStack>
          <Button variant="icon" size="sm" as={Link} href="https://peakd.com/register" target="blank">
            Get Hive Acct
          </Button>
          <Button variant="icon" size="sm" as={Link} href="https://hive-keychain.com/" target="blank">
            Install Hive Keychain
          </Button>
        </HStack>
        <Divider w={{ base: "90%", sm: "50%", md: "50%", lg: "30%" }} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async ({ username }) => {
            const message = new Date().toISOString();
            const { msg: signedMessage, success } = await HiveKeychain.requestSignBuffer(username, message);
            if (success) loginFN({ username, signedMessage, message });
          }}
        >
          {({ isSubmitting }) => (
            <VStack as={Form} w={{ base: "90%", sm: "50%", md: "50%", lg: "20%", xl: "20%" }}>
              <InputField placeholder="Username" name="username" />
              <HStack w="100%">
                <Button w="100%" isDisabled={!isInstalled} isLoading={isSubmitting} type="submit">
                  Hive Keychain Login
                </Button>
                <Tooltip shouldWrapChildren label="Recheck for Hive Keychain">
                  <Button onClick={checkHiveKeychain}>
                    <HiRefresh />
                  </Button>
                </Tooltip>
              </HStack>
              <Text>If the Login button is not active then:</Text>
              <Text>- You dont have Hivechain installed</Text>
              <Text>- Your browser is blocking Hive Keychain. (open it and refresh)</Text>
            </VStack>
          )}
        </Formik>
      </VStack>
    </SingleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
