import { FormControl, FormErrorMessage, FormLabel, Slider, SliderProps } from "@chakra-ui/react";
import { Field, FieldAttributes, useField } from "formik";

type SliderFieldProps = FieldAttributes<SliderProps> & {
  label?: string;
  name: string;
};

export const SliderField: React.FC<SliderFieldProps> = ({ label, ...props }) => {
  const [, { error, touched }] = useField(props.name);
  return (
    <FormControl flex={1} isInvalid={Boolean(error) && touched}>
      {label ? <FormLabel htmlFor={props.name}>{label}</FormLabel> : <></>}
      <Field as={Slider} borderColor="gray" {...props} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : <></>}
    </FormControl>
  );
};
