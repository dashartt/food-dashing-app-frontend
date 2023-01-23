import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useApplyDeliveryFee from "src/store/useApplyDeliveryFee";

export default function DeliveryOrPickup() {
  const [mounted, setMounted] = useState(false);

  const { option, changeOption } = useApplyDeliveryFee();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
      {mounted && (
        <RadioGroup className="m-4" onChange={changeOption} value={option}>
          <Stack direction="row">
            <Radio defaultChecked value="delivery">
              Delivery
            </Radio>
            <Radio value="pick up">Buscar</Radio>
          </Stack>
        </RadioGroup>
      )}
    </>
  );
}
