import { Button, ButtonProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface EnumButtonsProps<TEnum extends string> extends ButtonProps {
  eEnum: { [key in TEnum]: TEnum };
  eEnumToLabel?: Record<TEnum, string>;
  selected: string;
  setSelected: Dispatch<SetStateAction<TEnum>>;
}

export const EnumButtons = <TEnum extends string>({
  eEnum,
  eEnumToLabel = {} as Record<TEnum, string>,
  selected,
  setSelected,
  ...buttonProps
}: EnumButtonsProps<TEnum>) => {
  return (
    <>
      {Object.values<TEnum>(eEnum).map((eEnum, idx) => (
        <Button key={idx} variant="selector" isActive={selected === eEnum} onClick={() => setSelected(eEnum)} {...buttonProps}>
          {eEnumToLabel[eEnum] || eEnum}
        </Button>
      ))}
    </>
  );
};
