import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePaymentState from "src/store/checkout/usePayment";

export default function NeedPayback() {
  const [mounted, setMounted] = useState(false);

  const { setHasPayBack, hasPayBack, getPayback } = usePaymentState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <RadioGroup
          value={hasPayBack ? "yes" : "no"}
          onChange={(value) => {
            setHasPayBack(value === "yes");
            getPayback(0);
          }}
        >
          <Stack direction="row">
            <Radio className="border border-gray-700" defaultChecked value="no">
              Não
            </Radio>
            <Radio className="border border-gray-700" value="yes">
              Sim
            </Radio>
          </Stack>
        </RadioGroup>
      )}
    </>
  );
}
