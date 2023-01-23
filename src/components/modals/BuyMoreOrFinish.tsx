"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
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

import useObservationPizzaState from "@/store/pizza/useObservationPizza";

type Props = {
  orderItem: ICartItem;
  children: ReactNode | undefined;
};

export default function BuyMoreOrFinish({ children, orderItem }: Props) {
  const [mounted, setMounted] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const { addItem } = useShoppingCart();
  const { resetStuffing, isHalf } = usePizzaStuffing();
  const { resetAnotherHalf, anotherHalfPizza } = useAnotherHalfPizzaState();
  const { resetObservation } = useObservationPizzaState();

  const onAddItem = () => {
    onOpen(); // open modal to continue buying or finish purchase
    addItem(orderItem); // add item to cart
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
            className="w-full rounded-none bg-[#1a95f3] py-6 text-white"
          >
            {children}
          </Button>
          <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">Você deseja</DrawerHeader>
              <DrawerBody>
                {/* Button options -----------> */}
                <VStack className="py-4">
                  <Button
                    onClick={() => afterAddGoTo("/")}
                    className="w-52 rounded-none bg-[#1a95f3] py-2 text-center text-white"
                  >
                    Continuar comprando
                  </Button>
                  <Button
                    onClick={() => afterAddGoTo("/cart")}
                    className="w-52 rounded-none border border-gray-400 bg-[#ebebeb] py-2 text-center"
                  >
                    Finalizar compra
                  </Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
