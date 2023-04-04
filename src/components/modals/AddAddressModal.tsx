import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsQuestionCircle } from "react-icons/bs";

import useAddressesState from "@/store/checkout/useAddresses";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import useSessionState from "@/store/useSession";
import type { IAddress } from "@/types/address.type";

import * as API from "../../services/API/user.service";
import SearchPlaceInput from "../inputs/SearchPlaceInput";

type Props = {
  addressId?: string;
  defaultValues?: {
    referencePoint?: string;
    complement?: string;
    address?: string;
  };
};

export default function AddAddressModal({ addressId, defaultValues }: Props) {
  const toast = useToast({ position: "top" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { session } = useSessionState();

  const shopAddress = useShopSettings(
    ({ shopSettings }) => shopSettings?.shopAddress
  );

  const { addAddress } = useAddressesState();
  const addressRef = useRef<IAddress>();
  const complementRef = useRef<HTMLInputElement>(null);
  const referencePointRef = useRef<HTMLTextAreaElement>(null);

  const modalHeaderTitle = (addressId ? "Atualizar " : "Cadastrar ").concat(
    "endereço"
  );

  const onSelectAddress = (address: IAddress) => {
    addressRef.current = address;
  };

  const onConfirmAddress = () => {
    const data = {
      city: addressRef.current?.city || "",
      country: addressRef.current?.country || "",
      postcode: addressRef.current?.postcode || "",
      lat: addressRef.current?.lat || 0,
      lon: addressRef.current?.lon || 0,
      place_id: addressRef.current?.place_id || "",
      state_code: addressRef.current?.state_code || "",
      street: addressRef.current?.street || "",
      housenumber: addressRef.current?.housenumber || "",
      suburb: addressRef.current?.suburb || "",
      ...(referencePointRef.current?.value !== "" && {
        referencePoint: referencePointRef.current?.value || "",
      }),
      ...(complementRef.current?.value !== "" && {
        complement: complementRef.current?.value || "",
      }),
    };

    API.addAddress(session?._id!, { ...data }).then((response) => {
      toast({
        title: response.message,
      });

      addAddress({ ...data });

      onClose();
    });
  };

  return (
    <>
      <Button
        className="m-0 bg-white p-0 underline underline-offset-4"
        onClick={onOpen}
      >
        Adicionar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-fit">
          <ModalHeader className="">{modalHeaderTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack className="items-start space-y-4">
              <FormControl>
                <FormLabel htmlFor="address">Endereço</FormLabel>
                <Input
                  city={shopAddress?.city || ""}
                  stateCode={shopAddress?.state_code || ""}
                  defaultValue={addressId && defaultValues?.address}
                  id="address"
                  as={SearchPlaceInput}
                  onSelectAddress={onSelectAddress}
                />
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel htmlFor="complement" className="m-0">
                    Complemento (opcional)
                  </FormLabel>
                  <Tooltip
                    hasArrow
                    placement="top"
                    label="em alguns tipos de residências existem outro número para identificá-lo, por exemplo apartamento e é necessário informar tal número"
                    aria-label="mensagem para ajudar em caso de dúvida"
                  >
                    <IconButton
                      className="bg-transparent"
                      aria-label={`ver detalhes do campo ponto de complemento`}
                      icon={<BsQuestionCircle className="text-xl" />}
                    />
                  </Tooltip>
                </HStack>
                <Input
                  id="complement"
                  ref={complementRef}
                  className="border border-gray-500"
                  defaultValue={addressId && defaultValues?.complement}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="observation">
                  Observações (opcional)
                </FormLabel>
                <Textarea
                  id="observation"
                  ref={referencePointRef}
                  defaultValue={addressId && defaultValues?.referencePoint}
                  className="max-h-20 border border-gray-500 placeholder:text-gray-600"
                  placeholder="Ex: perto de tal bar, próximo de tal mercado, etc"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onConfirmAddress}
              className="bg-blue-500 active:bg-blue-300 hover:bg-blue-300 text-white"
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
