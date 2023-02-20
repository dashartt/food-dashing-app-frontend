import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
} from "@chakra-ui/react";

import AdditionalsList from "../list/AdditionalsList";

type Props = {
  category: string;
};

export default function AdditionalsAccordion({ category }: Props) {
  return (
    <Accordion allowToggle>
      <AccordionItem className="border-none">
        <AccordionButton _hover={{ bg: "bg-white" }} className="w-full">
          <HStack className="justify-between w-full">
            <Text className="font-semibold">Adicionais</Text>
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel pb={4}>
          <AdditionalsList category={category} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
