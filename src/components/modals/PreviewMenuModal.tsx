import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import useCategories from "@/store/shop/setup/useCategories";
import useMenu from "@/store/shop/setup/useMenu";

import CreateableMenu from "../tabs/CreateableMenu";

export default function PreviewMenuModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { menu } = useMenu();
  const { categories } = useCategories();
  return (
    <>
      <Button
        className="border border-gray-400 bg-white py-6 font-normal shadow-lg"
        onClick={onOpen}
      >
        Preview do cardápio
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="">Cardápio</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="relative max-h-[80vh] overflow-auto p-4">
            {categories.length > 0 ? (
              <CreateableMenu
                menu={menu}
                categories={categories.map((category) => ({ name: category }))}
              />
            ) : (
              <Text>
                Registre alguma categoria antes de visualizar algum produto do
                cardápio
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
