import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import useBorderType from "@/store/pizza/useBorderType";
import useAdditionals from "@/store/useAdditionals";
import useShoppingCart from "@/store/useShoppingCart";
import type { ICartItem } from "@/types";

import AdditionalsAccordion from "../accordions/AdditionalsAccordion";
import PizzaBorderRadio from "../radios/PizzaBorderRadio";

type Props = {
  item: ICartItem;
};

export default function ItemCartModal({ item }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { updateItem } = useShoppingCart();
  const { borderType, setBorderType } = useBorderType();
  const { setInitialValue, additionals } = useAdditionals();
  const obsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    onOpen();
    if (item.additionals && item.additionals?.length > 0)
      setInitialValue(item.additionals);
  }, []);

  const afterConfirm = () => {
    setBorderType("");
  };

  const onConfirm = () => {
    updateItem(item._id || "", {
      observation: obsRef.current?.value,
      borderType: borderType === "none" ? "sem borda" : borderType,
      additionals,
    });

    afterConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="">Editar item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack className="space-y-6 items-start">
            {/* Additional container */}
            {/pizza|arabic/.test(item.item[0]?.category.name || ".") && (
              <Box className="w-full rounded-md border border-gray-400 py-2">
                <AdditionalsAccordion
                  category={item.item[0]?.category.name || ""}
                />
              </Box>
            )}

            {item?.item[0]?.category?.name.includes("pizza") && (
              <VStack className="items-start text-lg font-semibold">
                <Text>Qual opção de borda?</Text>
                <PizzaBorderRadio
                  defaultValue={
                    item.borderType === "sem borda" ? "none" : item.borderType
                  }
                />
              </VStack>
            )}
            {/* Observation ----------------> */}
            {item?.item[0]?.category.name !== "drinks" && (
              <VStack className="w-full items-start">
                <Text className="text-lg font-semibold">Observações</Text>

                <Textarea
                  ref={obsRef}
                  defaultValue={item.observation}
                  placeholder="Ex: tirar cebola, ovo, etc"
                  className="max-h-32 w-full max-w-md border-gray-400"
                />
              </VStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onConfirm} className="bg-gray-default text-white">
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
