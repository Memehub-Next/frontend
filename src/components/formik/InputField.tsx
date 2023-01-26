import { FormControl, FormControlProps, FormLabel, FormLabelProps, Input, InputProps } from "@chakra-ui/react";
import { ErrorMessage, Field, FieldAttributes, useField } from "formik";

type InputFieldProps = Omit<FieldAttributes<InputProps>, "name"> & {
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  label?: string;
  name: string;
};
const InputField: React.FC<InputFieldProps> = ({ formControlProps, formLabelProps, label, name, ...inputProps }) => {
  const [, { error, touched }] = useField(name);
  return (
    <FormControl isInvalid={Boolean(error) && touched} {...formControlProps}>
      {label && (
        <FormLabel htmlFor={name} {...formLabelProps}>
          {label}
        </FormLabel>
      )}
      <Field as={Input} name={name} {...inputProps} />
      <ErrorMessage name={name} />
    </FormControl>
  );
};
export default InputField;
