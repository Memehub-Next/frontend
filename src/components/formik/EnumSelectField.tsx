import { chakra, FormControl, Select, SelectProps } from "@chakra-ui/react";
import { ErrorMessage, Field, useField } from "formik";
import { ChangeEvent } from "react";

interface EnumSelectProps<TEnum extends string> extends SelectProps {
  eEnum: { [key in TEnum]: TEnum };
  eEnumToLabel?: Record<TEnum, string>;
  sideEffect?: (value: TEnum) => void;
  order?: TEnum[];
  name: string;
}

export const EnumSelectField = <TEnum extends string>({
  eEnum,
  eEnumToLabel = {} as Record<TEnum, string>,
  sideEffect,
  order,
  name,
  ...props
}: EnumSelectProps<TEnum>) => {
  const [, { error, touched }, { setValue }] = useField(name);
  return (
    <FormControl isInvalid={Boolean(error) && touched}>
      <Field
        as={Select}
        name={name}
        rounded="none"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          sideEffect && sideEffect(e.target.value as TEnum);
          setValue(e.target.value as TEnum);
        }}
        {...props}
      >
        {(order ?? Object.values<TEnum>(eEnum)).map((eEnum, idx) => (
          <chakra.option key={idx} value={eEnum} style={{ backgroundColor: "black" }}>
            {eEnumToLabel[eEnum] ?? eEnum}
          </chakra.option>
        ))}
      </Field>
      <ErrorMessage name={name} />
    </FormControl>
  );
};
