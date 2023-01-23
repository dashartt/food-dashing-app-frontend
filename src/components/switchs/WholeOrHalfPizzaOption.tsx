import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePizzaStuffing from "src/store/pizza/usePizzaStuffing";

export default function WholeOrHalfPizzaOption() {
  const [mounted, setMounted] = useState(false);

  const [option, setOption] = useState("whole");
  const updateStuffing = usePizzaStuffing((state) => state.updateStuffing);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
      {mounted && (
        <RadioGroup
          className="mt-4"
          onChange={(value) => {
            setOption(value);
            updateStuffing(value === "half");
          }}
          value={option}
        >
          <Stack direction="row">
            <Radio defaultChecked value="whole">
              Inteira
            </Radio>
            <Radio value="half">Metade</Radio>
          </Stack>
        </RadioGroup>
      )}
    </>
  );
}
