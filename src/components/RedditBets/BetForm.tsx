import { Button, ButtonProps } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Center, HStack, Text, VStack } from "@chakra-ui/layout";
import { Switch, useBoolean, useToast } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { Tooltip } from "@chakra-ui/tooltip";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { EPositionSide, RedditMemeFragment, useMeQuery, usePlaceBetMutation } from "../../graphql/urql-codegen";
import NumberInputField from "../formik/NumberInputField";

interface IFormValues {
  betSize: number;
  target: number;
}

interface BetFormProps extends ButtonProps {
  redditMeme?: RedditMemeFragment;
}

export const BetForm: React.FC<BetFormProps> = ({ redditMeme }) => {
  const router = useRouter();
  const toast = useToast();
  const [isBuy, { toggle }] = useBoolean(true);
  const [{ data }] = useMeQuery();
  const [, placeBetFN] = usePlaceBetMutation();
  const validationSchema = yup.object<Record<keyof IFormValues, yup.AnySchema>>({
    betSize: yup
      .number()
      .integer()
      .min(1)
      .max(data?.me?.gbp ?? 100)
      .required(),
    target: yup.number().integer().min(50).max(99).required(),
  });
  const testTrade = ({ target, potentialProfit }: { target: number; potentialProfit: number }) => {
    if ((isBuy && target < (redditMeme?.percentile ?? 0)) || (!isBuy && target > (redditMeme?.percentile ?? 100))) {
      toast({ status: "success", title: `Good Trade! You won ${potentialProfit}GBP! Sign up to get your good boy points!` });
    } else toast({ status: "warning", title: "Oh no :( try again!" });
  };
  return (
    <Center w={{ base: "100%", md: "50%" }}>
      <Formik
        initialValues={{ betSize: 5, target: 50 }}
        validationSchema={validationSchema}
        onSubmit={({ betSize, target }) =>
          placeBetFN({ betSize, redditMemeId: redditMeme?.id!, target, ePositionSide: isBuy ? EPositionSide.Buy : EPositionSide.Sell })
        }
      >
        {({ isSubmitting, values: { betSize, target }, setFieldValue }) => {
          const isYolo = betSize === (data?.me?.gbp ?? 100);
          const targetToMultiplier = target / 100 / (1 - target / 100);
          const isYoloToMultiplier = isYolo ? 2 : 1;
          const potentialProfit = Math.round(betSize * targetToMultiplier) * isYoloToMultiplier;
          return (
            <VStack p={1} as={Form} w="100%">
              <HStack w="100%" justifyContent="space-between">
                <Tooltip shouldWrapChildren label="Bet it all, and get a 2x multiplier!">
                  <Checkbox
                    isChecked={isYolo}
                    onChange={() => (isYolo ? setFieldValue("betSize", 5) : setFieldValue("betSize", data?.me?.gbp))}
                  >
                    <Text>Yolo</Text>
                  </Checkbox>
                </Tooltip>
                <Switch
                  size="sm"
                  isChecked={isBuy}
                  onChange={() => {
                    setFieldValue("target", 50);
                    toggle();
                  }}
                >
                  {isBuy ? "Long" : "Short"}
                </Switch>
              </HStack>
              <Text>Bet Size in GBP</Text>
              <NumberInputField name="betSize" min={1} step={5} max={data?.me?.gbp ?? 100} />
              <Text alignSelf="flex-start">Target Percentile</Text>
              <NumberInputField name="target" isDisabled={!isBuy} min={50} max={99} step={1} />
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Target Multiplier</Td>
                    <Td isNumeric>{(isBuy ? targetToMultiplier : 1).toFixed(2)}</Td>
                  </Tr>
                  <Tr>
                    <Td>Potential Profit</Td>
                    <Td isNumeric>{potentialProfit} GBP</Td>
                  </Tr>
                  <Tr>
                    <Td>Current Balance</Td>
                    <Td isNumeric>{data?.me?.gbp ?? 0} GBP</Td>
                  </Tr>
                </Tbody>
              </Table>
              {data?.me ? (
                <Button variant={isBuy ? "upvote" : "downvote"} isActive={true} isLoading={isSubmitting} w="100%" type="submit">
                  {isYolo ? "YOLO!" : isBuy ? "Buy" : "Sell"}
                </Button>
              ) : (
                <>
                  <Button variant="icon" w="100%" onClick={() => router.push("/auth/login")}>
                    SIGN UP TO START TRADING!
                  </Button>
                  <Button variant="icon" w="100%" onClick={() => testTrade({ target, potentialProfit })}>
                    TEST TRADE!
                  </Button>
                </>
              )}
            </VStack>
          );
        }}
      </Formik>
    </Center>
  );
};
