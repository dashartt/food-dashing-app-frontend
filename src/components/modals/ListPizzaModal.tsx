import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

import useAnotherHalfPizzaState from "@/store/pizza/useAnotherHalfPizza";
import { StoreCallback } from "@/utils";

import MenuTabs from "../tabs/menu/MenuTabs";

export default function ListPizzasModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { anotherHalfPizza } = useAnotherHalfPizzaState();

  useEffect(() => {
    StoreCallback.setCallback({
      key: "ListPizzaModal/onClose",
      callback: onClose,
    });
  }, []);

  return (
    <>
      {!anotherHalfPizza && (
        <Button className="bg-blue-500 font-normal text-white" onClick={onOpen}>
          Selecione a outra metade
        </Button>
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="">Cardápio</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="relative max-h-[80vh] overflow-auto p-0">
            <MenuTabs items={["salty pizza", "sweet pizza"]} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
