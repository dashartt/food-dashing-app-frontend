import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useEffect } from "react";

// type Status = "to-do" | "in-progress" | "pick-up" | "delivery" | "completed";
type StepDetailsMap = {
  [status: string]: {
    step: number;
    text: string;
  };
};

const stepDetailsMap: StepDetailsMap = {
  "to-do": { step: 1, text: "Recebemos seu pedido" },
  "in-progress": { step: 2, text: "Preparando seu pedido" },
  delivery: { step: 3, text: "Saiu para entrega" },
  "pick-up": { step: 3, text: "Pronto para retirada no local" },
  completed: { step: 4, text: "Concluido" },
};
const stepsMap = [...Object.values(stepDetailsMap)];

const getStepDetails = (status: string) => {
  return stepDetailsMap[status];
};

type Props = {
  status: string;
  isDelivery: boolean;
};

export const OrderStatusStepper = ({ status, isDelivery }: Props) => {
  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  const steps = stepsMap.filter(({ text }) =>
    isDelivery ? !text.includes("retirada") : !text.includes("entrega")
  );

  useEffect(() => {
    setStep(getStepDetails(status)?.step || 0);
  }, [status]);

  return (
    <>
      <Steps colorScheme="blue" orientation="vertical" activeStep={activeStep}>
        {steps.map(({ step, text }) => (
          <Step width="100%" label={text} key={step}>
            {/* <Contents my={1} index={index} /> */}
          </Step>
        ))}
      </Steps>
    </>
  );
};

export default OrderStatusStepper;
