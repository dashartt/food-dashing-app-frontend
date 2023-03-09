import { Button, HStack } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

import ShopCategoriesStep from "./steps/ShopCategoriesStep";
import ShopInfoStep from "./steps/ShopInfoStep";
import ShopMenuStep from "./steps/ShopMenuStep";

const steps = [
  { label: "Informações da loja", Content: ShopInfoStep },
  { label: "Categorias", Content: ShopCategoriesStep },
  { label: "Cardápio", Content: ShopMenuStep },
];

export default function ShopSetupStepper() {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <>
      <Steps
        className="w-full"
        colorScheme="blue"
        orientation="vertical"
        activeStep={activeStep}
      >
        {steps.map(({ label, Content }) => (
          <Step className="w-full" label={label} key={label}>
            <Content />
          </Step>
        ))}
      </Steps>
      {activeStep !== steps.length && (
        <HStack className="w-full justify-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Anterior
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
          </Button>
        </HStack>
      )}
    </>
  );
}
