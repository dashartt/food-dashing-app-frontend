import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { BsPlusSquare } from "react-icons/bs";

import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IShopSettings } from "@/types/shop/settings.type";

import ShopAdditionalSetup from "../stepper/shop-setup/steps/ShopAdditionalSetup";
import ShopInfoStep from "../stepper/shop-setup/steps/ShopInfoStep";
import ShopMenuStep from "../stepper/shop-setup/steps/ShopMenuStep";
import ShopSetupDeliveryFeeStep from "../stepper/shop-setup/steps/ShopSetupDeliveryFeeStep";
// import {} from "../../services/API/shop.service";

export default function AddShopModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm<IShopSettings>();
  const { shopSettings } = useShopSettings();

  const onAddShop = () => {
    // onClose()
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Cadastrar loja"
        className="bg-white"
        icon={<BsPlusSquare className="text-2xl" />}
      />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar loja</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody className="max-h-[60vh] overflow-auto">
            <FormProvider {...methods}>
              <Accordion allowToggle className="space-y-6">
                <AccordionItem className="rounded-md border border-gray-400 p-4">
                  <AccordionButton>
                    <Text>Informações</Text>
                    <Spacer />
                    <AccordionIcon></AccordionIcon>
                  </AccordionButton>
                  <AccordionPanel>
                    <ShopInfoStep />
                  </AccordionPanel>
                </AccordionItem>
                {/* <AccordionItem className="rounded-md border border-gray-400 p-4">
                  <AccordionButton>
                    <Text>Taxas de entrega</Text>
                    <Spacer />
                    <AccordionIcon></AccordionIcon>
                  </AccordionButton>
                  <AccordionPanel>
                    <ShopSetupDeliveryFeeStep />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem className="rounded-md border border-gray-400 p-4">
                  <AccordionButton>
                    <Text>Menu</Text>
                    <Spacer />
                    <AccordionIcon></AccordionIcon>
                  </AccordionButton>
                  <AccordionPanel>
                    <ShopMenuStep />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem className="rounded-md border border-gray-400 p-4">
                  <AccordionButton>
                    <Text>Adicionais</Text>
                    <Spacer />
                    <AccordionIcon></AccordionIcon>
                  </AccordionButton>
                  <AccordionPanel>
                    <ShopAdditionalSetup />
                  </AccordionPanel>
                </AccordionItem> */}
              </Accordion>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => console.log(shopSettings)}>
              View state
            </Button>
            <HStack>
              <Button onClick={onClose}>Fechar</Button>
              <Button onClick={onAddShop}>Criar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
