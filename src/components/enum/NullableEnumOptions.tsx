import { chakra, Select, SelectProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface NullableEnumSelectProps<TEnum extends string> extends SelectProps {
  eEnum: { [key in TEnum]: TEnum };
  eEnumToLabel: Record<TEnum | "undefined", string> | (Record<TEnum, string | undefined> & { undefined: string });
  setSelected: Dispatch<SetStateAction<TEnum | undefined>>;
}

export const NullableEnumSelect = <TEnum extends string>({
  eEnum,
  eEnumToLabel,
  setSelected,
  ...props
}: NullableEnumSelectProps<TEnum>) => {
  return (
    <Select rounded="none" onChange={(e) => setSelected(e.target.value as TEnum)} {...props}>
      {Object.values<TEnum>(eEnum).map((eEnum, idx) => (
        <chakra.option key={idx} value={eEnum}>
          {(eEnumToLabel && eEnumToLabel[eEnum]) || eEnum}
        </chakra.option>
      ))}
      <chakra.option value={undefined}>{eEnumToLabel["undefined"]}</chakra.option>
    </Select>
  );
};
