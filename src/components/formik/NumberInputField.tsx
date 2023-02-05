import {
  FormControl,
  FormControlProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";

interface NumberInputFieldProps extends NumberInputProps {
  formControlProps?: FormControlProps;
  name: string;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({ formControlProps, name, ...inputProps }) => {
  const [{ value }, { error, touched }, { setValue }] = useField<number>(name);
  return (
    <FormControl isInvalid={Boolean(error) && touched} {...formControlProps}>
      <NumberInput name={name} allowMouseWheel defaultValue={value} value={value} onChange={(_, val) => setValue(val)} {...inputProps}>
        <ChakraNumberInputField rounded="none" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <ErrorMessage name={name} />
    </FormControl>
  );
};
export default NumberInputField;
