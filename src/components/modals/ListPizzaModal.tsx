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

import useAnotherHalfPizzaState from "@/store/pizza/useAnotherHalfPizza";
import useShopSettings from "@/store/shop/setup/useShopSetup";

import MenuItemsTabs from "../tabs/CreateableMenu";

export default function ListPizzasModal() {
  const categories =
    useShopSettings(({ shopSettings }) => shopSettings?.categories)?.filter(
      (category) => category.allowHalf
    ) || [];
  const items =
    useShopSettings(({ shopSettings }) => shopSettings?.items) || [];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { anotherHalfPizza } = useAnotherHalfPizzaState();

  return (
    <>
      {!anotherHalfPizza && (
        <Button
          className="border border-gray-400 bg-white py-6 font-normal shadow-lg"
          onClick={onOpen}
        >
          Ver opções de pizzas
        </Button>
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="">Cardápio</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="relative max-h-[80vh] overflow-auto p-0">
            <MenuItemsTabs menu={items} categories={categories} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
