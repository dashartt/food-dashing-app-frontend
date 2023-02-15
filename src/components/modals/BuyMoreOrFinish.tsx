"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import useAnotherHalfPizzaState from "src/store/pizza/useAnotherHalfPizza";
import usePizzaStuffing from "src/store/pizza/usePizzaStuffing";
import useShoppingCart from "src/store/useShoppingCart";
import type { ICartItem } from "src/types";
import { v4 as uuid } from "uuid";

import useObservationPizzaState from "@/store/pizza/useObservationPizza";

type Props = {
  orderItem: ICartItem;
  children: ReactNode | undefined;
};

export default function BuyMoreOrFinish({ children, orderItem }: Props) {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const shoppingCart = useShoppingCart();
  const { resetStuffing, isHalf } = usePizzaStuffing();
  const { resetAnotherHalf, anotherHalfPizza } = useAnotherHalfPizzaState();
  const { resetObservation } = useObservationPizzaState();

  const onAddItem = () => {
    onOpen(); // open modal to continue buying or finish purchase

    // add item to cart
    shoppingCart.addItem({
      _id: uuid(),
      ...orderItem,
    });
  };

  const afterAddGoTo = (path: string) => {
    resetStuffing(); // reset pizza stuffing option
    resetAnotherHalf(); // reset another chosen half
    resetObservation(); // reset observation pizza
    router.push(path);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          <Button
            disabled={!anotherHalfPizza && isHalf}
            onClick={onAddItem}
            className="space-x-4 bg-gray-default py-6 text-white"
          >
            {children}
          </Button>
          <Modal
            closeOnOverlayClick={false}
            closeOnEsc={false}
            isCentered
            onClose={onClose}
            isOpen={isOpen}
          >
            <ModalOverlay />
            <ModalContent className="mx-auto w-full sm:w-96">
              <ModalHeader className="border-b-2 border-gray-300">
                <Text className="text-center font-normal">
                  Adicionado ao carrinho
                </Text>
              </ModalHeader>

              <ModalBody className="p-4">
                {/* Button options -----------> */}
                <VStack className="space-y-4 py-4">
                  <Button
                    onClick={() => afterAddGoTo("/")}
                    className="w-52 bg-gray-default p-6 text-center text-white font-normal"
                  >
                    Voltar para o cardápio
                  </Button>
                  <Button
                    onClick={() => afterAddGoTo("/cart")}
                    className="w-52 border border-gray-500 bg-white p-6 text-center font-normal"
                  >
                    Finalizar pedido
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
