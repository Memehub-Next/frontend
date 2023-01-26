import { Button, ButtonProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface NullableEnumButtonsProps<TEnum extends string> extends ButtonProps {
  order?: TEnum[];
  eEnum: { [key in TEnum]: TEnum };
  selected: string | undefined;
  eEnumProps?: Record<TEnum, undefined | (ButtonProps & { label?: string })>;
  setSelected: Dispatch<SetStateAction<TEnum | undefined>>;
}

export const NullableEnumButtons = <TEnum extends string>({
  order,
  eEnum,
  selected,
  setSelected,
  variant,
  eEnumProps = {} as Record<TEnum, undefined | (ButtonProps & { label?: string })>,
  ...buttonProps
}: NullableEnumButtonsProps<TEnum>) => {
  return (
    <>
      {(order ?? Object.values<TEnum>(eEnum)).map((eEnum, idx) => (
        <Button
          key={idx}
          isActive={selected === eEnum}
          onClick={() => setSelected(selected === eEnum ? undefined : eEnum)}
          variant={variant || eEnumProps[eEnum]?.variant || "selector"}
          {...buttonProps}
          {...eEnumProps[eEnum]}
        >
          {eEnumProps[eEnum]?.label || eEnum}
        </Button>
      ))}
    </>
  );
};
