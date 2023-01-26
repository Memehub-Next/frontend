import { Checkbox, CheckboxProps, FormControl } from "@chakra-ui/react";
import { ErrorMessage, Field, useField } from "formik";

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ name, children, ...checkboxProps }) => {
  const [field, { error, touched }] = useField<boolean>({ name, type: "checkbox" });
  return (
    <FormControl isInvalid={Boolean(error) && touched}>
      <Field as={Checkbox} type="checkbox" {...field} {...checkboxProps}>
        {children}
      </Field>
      <ErrorMessage name={name} />
    </FormControl>
  );
};
