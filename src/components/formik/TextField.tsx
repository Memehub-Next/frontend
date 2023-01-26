import { Flex, FormControl, FormLabel, Textarea, TextareaProps } from "@chakra-ui/react";
import { ErrorMessage, Field, useField } from "formik";

interface TextFieldProps extends TextareaProps {
  label?: string;
  name: string;
}

export const TextField: React.FC<TextFieldProps> = ({ label, children, ...props }) => {
  const [, { error, touched }] = useField(props.name);
  return (
    <FormControl flex={1} isInvalid={Boolean(error) && touched}>
      {label ? <FormLabel htmlFor={props.name}>{label}</FormLabel> : <></>}
      <Flex>
        <Field as={Textarea} {...{ [children ? "roundedRight" : "rounded"]: "none" }} {...props} />
        {children}
      </Flex>
      <ErrorMessage name={props.name} />
    </FormControl>
  );
};
