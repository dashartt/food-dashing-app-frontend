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

import useAdditional from "@/store/shop/setup/useAdditionals";
import useCategories from "@/store/shop/setup/useCategories";

import AdditionalTabs from "../tabs/AdditionalTabs";

export default function PreviewAdditionalModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { additional } = useAdditional();
  const { categories } = useCategories();
  return (
    <>
      <Button
        className="border border-gray-400 bg-white py-6 font-normal shadow-lg"
        onClick={onOpen}
      >
        Preview dos adicionais
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="">Adicionais</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="relative max-h-[80vh] overflow-auto p-4">
            <AdditionalTabs
              additional={additional}
              categories={categories.map((category) => ({
                name: category,
              }))}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
