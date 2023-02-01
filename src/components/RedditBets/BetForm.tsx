import { Button, ButtonProps } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { Switch, useBoolean } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { Tooltip } from "@chakra-ui/tooltip";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { EPositionSide, useMeQuery, usePlaceBetMutation } from "../../graphql/urql-codegen";
import { useRedirect } from "../../hooks/useRedirect";
import NumberInputField from "../formik/NumberInputField";

interface IFormValues {
  betSize: number;
  target?: number;
}

interface BetFormProps extends ButtonProps {
  redditMemeId: string;
}

export const BetForm: React.FC<BetFormProps> = ({ redditMemeId }) => {
  const redirect = useRedirect();
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
  return (
    <Formik
      initialValues={{ betSize: 5, target: 50 }}
      validationSchema={validationSchema}
      onSubmit={({ betSize, target }) =>
        placeBetFN({ betSize, redditMemeId, target, ePositionSide: isBuy ? EPositionSide.Buy : EPositionSide.Sell })
      }
    >
      {({ isSubmitting, values: { betSize, target }, setFieldValue }) => {
        const isYolo = betSize === data?.me?.gbp;
        const targetToMultiplier = target / 100 / (1 - target / 100);
        const isYoloToMultiplier = isYolo ? 2 : 1;
        const potentialProfit = Math.round(betSize * targetToMultiplier) * isYoloToMultiplier;
        return (
          <VStack p={1} as={Form} w="50%">
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
            <NumberInputField name="betSize" min={1} step={5} max={data?.me?.gbp ?? 0} isDisabled={!data?.me?.gbp} />
            <Text alignSelf="flex-start">Target Percentile</Text>
            <NumberInputField name="target" isDisabled={!isBuy || !data?.me?.gbp} min={50} max={99} step={1} />
            <Table>
              <Tbody>
                <Tr>
                  <Td>Percentile Multiplier</Td>
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
              <Button variant="icon" w="100%" onClick={redirect("/auth/login")}>
                SIGN UP TO START BETTING!
              </Button>
            )}
          </VStack>
        );
      }}
    </Formik>
  );
};
