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
    // "to-do": 1,
    "in-progress": 0,
    oven: 1,
    delivery: 2,
    completed: 3,
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
