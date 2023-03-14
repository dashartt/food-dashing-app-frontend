import {
  Button,
  Card,
  CardBody,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { v4 as uuid } from "uuid";

import useCategories from "@/store/shop/setup/useCategories";

export default function PreviewCategoriesModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories, setCategories } = useCategories();

  const onRemoveCategory = (category: string) => {
    setCategories(categories.filter((category_) => category !== category_));
  };

  return (
    <>
      <Button
        className="border border-gray-400 bg-white py-6 font-normal shadow-lg"
        onClick={onOpen}
      >
        Preview das categorias
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categorias</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="relative max-h-[80vh] overflow-auto p-4">
            <VStack className="space-y-6">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Card key={uuid()} className="w-full" variant="outline">
                    <CardBody className="flex items-center justify-between">
                      <Text className="text-xl">{category}</Text>
                      <IconButton
                        onClick={() => onRemoveCategory(category)}
                        className="bg-white hover:bg-white active:bg-white"
                        aria-label="Deletar categoria"
                        icon={<MdClose className="text-2xl" />}
                      />
                    </CardBody>
                  </Card>
                ))
              ) : (
                <Text>Nenhuma categoria registrada</Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
