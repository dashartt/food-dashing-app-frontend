import type { RadioProps } from "@chakra-ui/react";
import { Box, useRadio } from "@chakra-ui/react";

type RadioCardProp = RadioProps & {
  inputValue: string;
};

export default function RadioCard(props: RadioCardProp) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

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
        {props.inputValue}
      </Box>
    </Box>
  );
}
