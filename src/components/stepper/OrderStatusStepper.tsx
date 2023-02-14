import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useEffect } from "react";

type Status = "to-do" | "in-progress" | "pick-up" | "delivery" | "completed";
type StepDetailsMap = {
  [status in Status]: {
    step: number;
    text: string;
  };
};

const stepDetailsMap: StepDetailsMap = {
  "to-do": { step: 0, text: "Recebemos seu pedido" },
  "in-progress": { step: 1, text: "Preparando seu pedido" },
  delivery: { step: 2, text: "Saiu para entrega" },
  "pick-up": { step: 2, text: "Pronto para retirada no local" },
  completed: { step: 3, text: "Concluido" },
};
const stepsMap = [...Object.values(stepDetailsMap)];

const getStepDetails = (status: string) => {
  const parseStatus = (status in Step ? status : "to-do") as Status;
  return stepDetailsMap[parseStatus] || 0;
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
    setStep(getStepDetails(status).step);
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
