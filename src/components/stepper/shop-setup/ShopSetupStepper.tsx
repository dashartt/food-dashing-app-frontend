import { Button, HStack } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FormProvider, useForm } from "react-hook-form";

import type { IShopSettings } from "@/types/shop/settings.type";

import ShopAdditionalSetup from "./steps/ShopAdditionalSetup";
import ShopInfoStep from "./steps/ShopInfoStep";
import ShopMenuStep from "./steps/ShopMenuStep";
import ShopSetupDeliveryFeeStep from "./steps/ShopSetupDeliveryFeeStep";

const steps = [
  { label: "Informações da loja", Content: ShopInfoStep },
  { label: "Taxas de entrega", Content: ShopSetupDeliveryFeeStep },
  { label: "Cardápio", Content: ShopMenuStep },
  { label: "Adicionais", Content: ShopAdditionalSetup },
];

export default function ShopSetupStepper() {
  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });
  const methods = useForm<IShopSettings>();

  return (
    <FormProvider {...methods}>
      <Steps
        className="w-full"
        colorScheme="blue"
        orientation="vertical"
        activeStep={activeStep}
      >
        {steps.map(({ label, Content }) => (
          <Step className="w-full" label={label} key={label}>
            <>
              <Content />
              <HStack className="mt-4 w-fit border-t-2 border-gray-400">
                <Button
                  className="bg-white active:bg-white hover:bg-white"
                  disabled={activeStep === 0}
                  onClick={prevStep}
                >
                  Anterior
                </Button>
                <Button
                  className="bg-white active:bg-white hover:bg-white"
                  disabled={activeStep === 3}
                  onClick={nextStep}
                >
                  Proximo
                </Button>
              </HStack>
            </>
          </Step>
        ))}
      </Steps>
      <Button onClick={() => console.log(methods.getValues())}>
        View form state
      </Button>
    </FormProvider>
  );
}
