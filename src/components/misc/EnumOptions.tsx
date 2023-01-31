import { Select, SelectProps } from "@chakra-ui/react";

interface EnumSelectProps<TEnum extends string> extends SelectProps {
  eEnum: { [key in TEnum]: TEnum };
  eEnumToLabel?: Record<TEnum, string>;
  setSelected: (enumValue: TEnum) => void;
}

export const EnumSelect = <TEnum extends string>({
  eEnum,
  eEnumToLabel = {} as Record<TEnum, string>,
  setSelected,
  ...props
}: EnumSelectProps<TEnum>) => {
  return (
    <Select rounded="none" onChange={(e) => setSelected(e.target.value as TEnum)} {...props}>
      {Object.values<TEnum>(eEnum).map((eEnum, idx) => (
        <option key={idx} value={eEnum} style={{ backgroundColor: "black" }}>
          {eEnumToLabel[eEnum] || eEnum}
        </option>
      ))}
    </Select>
  );
};
