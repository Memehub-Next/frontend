import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Skeleton,
} from "@chakra-ui/react";

export interface NumberInputWrapperProps extends Omit<NumberInputProps, "onChange"> {
  prefix?: string;
  suffix?: string;
  defaultValue?: number;
  value?: number;
  onChange: (valueAsNumber: number) => void;
}

export const NumberInputWrapper: React.FC<NumberInputWrapperProps> = ({
  prefix = "",
  suffix = "",
  defaultValue,
  value,
  onChange,
  format,
  parse,
  ...numberInputProps
}) => {
  format = format || ((val: number | string) => `${prefix}${val}${suffix}`);
  parse = parse || ((val: string) => val.replace(prefix, "").replace(suffix, ""));
  return (
    <Skeleton isLoaded={Boolean(typeof value !== "undefined" && typeof defaultValue !== "undefined")}>
      <NumberInput
        format={format}
        parse={parse}
        allowMouseWheel
        defaultValue={defaultValue}
        value={value}
        onChange={(_, val) => onChange(val)}
        {...numberInputProps}
      >
        <NumberInputField rounded="none" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Skeleton>
  );
};
