import type { RadioProps } from "@chakra-ui/react";
import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

import useAnotherHalfPizzaState from "@/store/pizza/useAnotherHalfPizza";
import usePizzaStuffing from "@/store/pizza/usePizzaStuffing";

type RadioCardProp = RadioProps & {
  inputValue: string;
};

function RadioCard(props: RadioCardProp) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const outputValue = props.value === "whole" ? "inteira" : "metade";

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        className="cursor-pointer rounded-md border border-gray-400 px-5 py-3 shadow-lg"
        _checked={{
          bg: "gray.default",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
      >
        {outputValue}
      </Box>
    </Box>
  );
}

export default function PizzaFillingRadio() {
  const options = ["whole", "half"];
  const { updateStuffing } = usePizzaStuffing();
  const { resetAnotherHalf } = useAnotherHalfPizzaState();

  const onChangeHandler = (current: string) => {
    updateStuffing(current === "half");
    resetAnotherHalf();
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "filling-option",
    defaultValue: "whole",
    onChange: onChangeHandler,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => (
        <RadioCard
          key={value}
          inputValue={value}
          {...getRadioProps({ value })}
        />
      ))}
    </HStack>
  );
}
