import type { AlertStatus } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { City, State } from "country-state-city";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { BsPlusSquare } from "react-icons/bs";

import { addShop, checkShopNameDuplicity } from "@/services/API/shop.service";
import useSessionState from "@/store/useSession";
import type { IShopSettings } from "@/types/shop.type";

import SearchPlaceInput from "../inputs/SearchPlaceInput";

type IOnCheckDataAPI = {
  status: string;
  message: string;
} | null;

export default function AddShopModal() {
  const toast = useToast({ position: "top" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkShopNameResponse, setCheckShopNameResponse] =
    useState<IOnCheckDataAPI>(null);

  const { session } = useSessionState();
  const methodsForm = useForm<Partial<IShopSettings>>();

  const onCheckShopName = (shopName: string) => {
    if (shopName === "") {
      setCheckShopNameResponse(null);
      return;
    }

    checkShopNameDuplicity(shopName).then(({ data, message }) => {
      setCheckShopNameResponse({
        message,
        status: data?.isDuplicated ? "error" : "success",
      });
    });
  };

  const onAddShop = () => {
    addShop({
      ...methodsForm.getValues(),
      owner: { _id: session?._id },
    }).then(({ data, message }) => {
      toast({
        title: message,
        status: data ? "success" : "error",
      });

      if (data) {
        onClose();
      }
    });
  };

  useEffect(() => {
    methodsForm.reset();

    setCheckShopNameResponse(null);
  }, []);

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Cadastrar loja"
        className="bg-white"
        icon={<BsPlusSquare className="text-3xl" />}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de loja</ModalHeader>

          <ModalBody>
            <VStack className="items-start space-y-6">
              <VStack className="items-start">
                <FormControl>
                  <FormLabel htmlFor="storeName">Nome da loja</FormLabel>
                  <Input
                    id="storeName"
                    as={DebounceInput}
                    {...methodsForm.register("shopName")}
                    debounceTimeout={2000}
                    onChange={({ target }) => {
                      onCheckShopName(target.value);
                      methodsForm.setValue("shopName", target.value);
                    }}
                    className="w-full border border-gray-400 "
                  />
                </FormControl>
                {checkShopNameResponse && (
                  <Alert
                    className="rounded-md"
                    status={checkShopNameResponse.status as AlertStatus}
                  >
                    <AlertIcon alignSelf="self-start" />
                    <Text>{checkShopNameResponse.message}</Text>
                  </Alert>
                )}
              </VStack>

              {checkShopNameResponse?.status === "success" && (
                <Box className="space-y-4">
                  <FormControl className="w-fit">
                    <FormLabel htmlFor="state">Estado</FormLabel>
                    <Select
                      defaultValue=""
                      {...methodsForm.register("shopAddress.state_code")}
                      id="state"
                      className="border border-gray-400"
                      // onChange={(event) => metoh(event.target?.value)}
                    >
                      <option className="hidden" value="">
                        Selecione o estado
                      </option>
                      {State.getStatesOfCountry("BR").map(
                        ({ isoCode, name }) => (
                          <option key={isoCode} value={isoCode}>
                            {name}
                          </option>
                        )
                      )}
                    </Select>
                  </FormControl>

                  {methodsForm.watch("shopAddress.state_code") !== "" && (
                    <FormControl className="w-fit">
                      <FormLabel htmlFor="city">Cidade</FormLabel>
                      <Select
                        id="city"
                        defaultValue=""
                        {...methodsForm.register("shopAddress.city")}
                        className="border border-gray-400"
                        // onChange={(event) => setCity(event.target?.value)}
                      >
                        <option className="hidden" value="">
                          Selecione a cidade
                        </option>
                        {City.getCitiesOfState(
                          "BR",
                          methodsForm.watch("shopAddress.state_code")
                        ).map(({ name }) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {methodsForm.watch("shopAddress.city") !== "" && (
                    <VStack className="items-start">
                      <FormControl className="w-fit min-w-[17.8rem] justify-start">
                        <FormLabel htmlFor="storeName">
                          Endereço da loja
                        </FormLabel>
                        <SearchPlaceInput
                          city={methodsForm.watch("shopAddress.city")}
                          stateCode={methodsForm.watch(
                            "shopAddress.state_code"
                          )}
                          onSelectAddress={(address) =>
                            methodsForm.setValue("shopAddress", address)
                          }
                        />
                      </FormControl>
                    </VStack>
                  )}
                </Box>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack className="space-x-4">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
              <Button onClick={onAddShop} className="bg-blue-500 text-white">
                Criar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
