import { Button, ButtonProps } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuList, useDisclosure } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import { Tooltip } from "@chakra-ui/tooltip";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { ExtendedButton } from "../../chakra/ExtendedButton";
import { useRedirect } from "../../core/hooks/useRedirect";
import { EPositionSide, useMeQuery, usePlaceBetMutation } from "../../graphql/urql-codegen";
import NumberInputField from "../formik/NumberInputField";

interface IFormValues {
  betSize: number;
  target?: number;
}

interface PlaceBetMenuProps extends ButtonProps {
  redditMemeId?: string;
  ePositionSide: EPositionSide;
  done: () => void;
}

export const PlaceBetMenu: React.FC<PlaceBetMenuProps> = ({ redditMemeId, ePositionSide, done, ...buttonProps }) => {
  const isBuy = ePositionSide === EPositionSide.Buy;
  const redirect = useRedirect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data }] = useMeQuery();
  const [, placeBetFN] = usePlaceBetMutation();
  if (!redditMemeId || !data?.me)
    return (
      <ExtendedButton
        label="Login or Signup to start trading memes!"
        isLoaded={Boolean(redditMemeId)}
        size="xs"
        variant={isBuy ? "upvote" : "downvote"}
        onClick={redirect("/auth/login")}
        {...buttonProps}
      >
        {ePositionSide}
      </ExtendedButton>
    );
  const { gbp } = data.me;
  const validationSchema = yup.object<Record<keyof IFormValues, yup.AnySchema>>({
    betSize: yup.number().integer().min(1).max(gbp).required(),
    target: yup.number().integer().min(50).max(99).required(),
  });
  const initialValues: yup.InferType<typeof validationSchema> = { betSize: 5, target: 50 };
  const isYolo = (betSize: number) => betSize === gbp;
  const targetToMultiplier = (target: number) => target / 100 / (1 - target / 100);
  const isYoloToMultiplier = (betSize: number) => (isYolo(betSize) ? 2 : 1);
  const potentialProfit = ({ betSize, target }: { betSize: number; target: number }) =>
    Math.round(betSize * targetToMultiplier(target)) * isYoloToMultiplier(betSize);
  return (
    <Box>
      <Menu isLazy isOpen={isOpen}>
        <MenuButton as={Button} variant={isBuy ? "upvote" : "downvote"} onMouseEnter={onOpen} onMouseLeave={onClose} {...buttonProps}>
          {ePositionSide}
        </MenuButton>
        <MenuList zIndex={100} rounded="sm" bg="black" onMouseEnter={onOpen} onMouseLeave={onClose}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({ betSize, target }) => placeBetFN({ betSize, redditMemeId, target, ePositionSide }).then(done)}
          >
            {({ isSubmitting, values: { betSize, target }, setFieldValue }) => (
              <VStack p={1} as={Form}>
                <HStack w="100%" justifyContent="space-between">
                  <Text>Bet Size in GBP</Text>
                  <Tooltip shouldWrapChildren label="Bet it all, and get a 2x multiplier!">
                    <Checkbox
                      isChecked={isYolo(betSize)}
                      onChange={() => (isYolo(betSize) ? setFieldValue("betSize", 5) : setFieldValue("betSize", gbp))}
                    >
                      <Text>Yolo</Text>
                    </Checkbox>
                  </Tooltip>
                </HStack>
                <NumberInputField name="betSize" min={1} step={5} max={gbp} />
                <Text alignSelf="flex-start">Target Percentile</Text>
                <NumberInputField name="target" isDisabled={!isBuy} min={50} max={99} step={1} />
                <Table>
                  <Tbody>
                    {[
                      { label: "Percentile Multiplier", value: isBuy && targetToMultiplier(target).toFixed(2) },
                      { label: "Potential Profit", value: `${potentialProfit({ target, betSize })} GBP` },
                      { label: "Current Balance", value: `${gbp} GBP` },
                    ].map(
                      ({ label, value }, idx) =>
                        value && (
                          <Tr key={idx}>
                            <Td>{label}</Td>
                            <Td isNumeric>{value}</Td>
                          </Tr>
                        )
                    )}
                  </Tbody>
                </Table>
                {isBuy ? (
                  <Button variant="upvote" isActive={true} isLoading={isSubmitting} w="100%" type="submit">
                    {isYolo(betSize) ? "YOLO!" : ePositionSide}
                  </Button>
                ) : (
                  <Tooltip shouldWrapChildren label="WARNING shorting is dangerous!">
                    <Button variant="downvote" isActive={true} isLoading={isSubmitting} w="100%" type="submit">
                      {isYolo(betSize) ? "YOLO!" : ePositionSide}
                    </Button>
                  </Tooltip>
                )}
              </VStack>
            )}
          </Formik>
        </MenuList>
      </Menu>
    </Box>
  );
};
