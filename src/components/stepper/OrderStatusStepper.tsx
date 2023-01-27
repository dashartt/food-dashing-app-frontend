import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useEffect } from "react";

const steps = [
  // { label: "A fazer" },
  { label: "Montando" },
  { label: "No forno" },
  { label: "Saiu para entrega" },
  {
    label: "Entregue",
  },
];

const getStepByStatus = (status: string) => {
  type MapSteps = {
    [name: string]: number;
  };
  const mapSteps: MapSteps = {
    "to-do": 0,
    "in-progress": 1,
    oven: 2,
    delivery: 3,
    completed: 4,
  };
  return mapSteps[status] || 0;
};

type Props = {
  status: string;
};

export const OrderStatusStepper = ({ status }: Props) => {
  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  useEffect(() => {
    setStep(getStepByStatus(status));
    console.log(`status: ${status} => step: ${getStepByStatus(status)}`);
  }, [status]);

  return (
    <>
      <Steps colorScheme="blue" orientation="vertical" activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step width="100%" label={label} key={label}>
            {/* <Contents my={1} index={index} /> */}
          </Step>
        ))}
      </Steps>
    </>
  );
};

export default OrderStatusStepper;
