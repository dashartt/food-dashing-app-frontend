import { useCheckboxGroup, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";

import ServiceDayCard from "./ServiceDayCard";

type Props = {
  onChange: (values: { label: string; value: string }[]) => void;
};

export default function ServiceDaysCheckbox({ onChange }: Props) {
  const options = [
    { label: "dom", value: "sun" },
    { label: "seg", value: "mon" },
    { label: "ter", value: "tue" },
    { label: "qua", value: "wed" },
    { label: "qui", value: "thu" },
    { label: "sex", value: "fri" },
    { label: "sab", value: "sat" },
  ];

  const { getCheckboxProps, value } = useCheckboxGroup();

  const getDaysOfWeekSelected = (values: string[]) =>
    options.filter((option) =>
      values.some((value_) => value_ === option.label)
    );

  useEffect(() => {
    onChange(getDaysOfWeekSelected(value as string[]));
  }, [value]);

  return (
    <Wrap>
      {options.map((value_) => (
        <ServiceDayCard
          key={value_.label}
          dayOfWeek={value_.label}
          {...getCheckboxProps({ value: value_.label })}
        />
      ))}
    </Wrap>
  );
}
