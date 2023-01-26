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
  suffix?: string;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({ formControlProps, name, suffix, ...inputProps }) => {
  const format = (val: number) => (suffix ? val.toString() + suffix : val.toString());
  const parse = (val: string) => parseInt(suffix ? val.replace(suffix, "") : val);
  const [{ value }, { error, touched }, { setValue }] = useField<number>(name);
  return (
    <FormControl isInvalid={Boolean(error) && touched} {...formControlProps}>
      <NumberInput
        name={name}
        allowMouseWheel
        defaultValue={format(value)}
        value={format(value)}
        onChange={(valueString: string) => setValue(parse(valueString))}
        {...inputProps}
      >
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
