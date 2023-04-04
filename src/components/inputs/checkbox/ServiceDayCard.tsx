import type { CheckboxProps } from "@chakra-ui/react";
import { Box, Text, useCheckbox } from "@chakra-ui/react";

type ServiceDayCardProps = CheckboxProps & {
  dayOfWeek: string;
};

export default function ServiceDayCard(props: ServiceDayCardProps) {
  const { getCheckboxProps, getInputProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        className="cursor-pointer rounded-md border border-gray-400 px-5 py-3"
        _checked={{
          bg: "blue.400",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
      >
        <Text className="font-normal">{props.dayOfWeek}</Text>
      </Box>
    </Box>
  );
}
