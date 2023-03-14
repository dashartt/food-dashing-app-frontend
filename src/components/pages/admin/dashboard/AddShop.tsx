import type { AlertStatus } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { City, State } from "country-state-city";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";

import ServiceDaysCheckbox from "@/components/inputs/checkbox/ServiceDaysInput";
import SearchPlaceInput from "@/components/inputs/SearchPlaceInput";
import { checkShopNameDuplicity } from "@/services/API/shop.service";
import type { IShopSettings } from "@/types/shop.type";

type IOnCheckShopNameAPI = {
  status: string;
  message: string;
} | null;

export default function AddShop() {
  const [onCheckShopNameAPI, setOnCheckShopNameAPI] =
    useState<IOnCheckShopNameAPI>(null);
  const methodsForm = useForm<IShopSettings>();

  const onCheckShopName = (shopName: string) => {
    if (shopName === "") {
      setOnCheckShopNameAPI(null);
      return;
    }

    checkShopNameDuplicity(shopName).then(({ data, message }) => {
      setOnCheckShopNameAPI({
        message,
        status: data?.isDuplicated ? "error" : "success",
      });
    });
  };

  return (
    <Box className="rounded-md bg-white p-10">
      <Text className="mb-4 text-4xl">Adicionar loja</Text>
      <VStack className=" items-start space-y-6">
        <VStack className="items-start">
          <FormControl>
            <FormLabel htmlFor="storeName">Nome da loja</FormLabel>
            <Input
              id="storeName"
              as={DebounceInput}
              {...methodsForm.register("shopName")}
              debounceTimeout={2000}
              onChange={({ target }) => onCheckShopName(target.value)}
              className="w-full border border-gray-400 "
            />
          </FormControl>
          {onCheckShopNameAPI && (
            <Alert
              className="rounded-md"
              status={onCheckShopNameAPI.status as AlertStatus}
            >
              <AlertIcon alignSelf="self-start" />
              <Text>{onCheckShopNameAPI.message}</Text>
            </Alert>
          )}
        </VStack>

        {onCheckShopNameAPI?.status === "success" && (
          <>
            <FormControl className="w-fit">
              <FormLabel htmlFor="state">Estado</FormLabel>
              <Select
                {...methodsForm.register("shopAddress.state_code")}
                id="state"
                className="border border-gray-400"
                // onChange={(event) => metoh(event.target?.value)}
              >
                <option className="hidden" value="">
                  Selecione o estado
                </option>
                {State.getStatesOfCountry("BR").map(({ isoCode, name }) => (
                  <option key={isoCode} value={isoCode}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {methodsForm.getValues().shopAddress?.state_code !== "" && (
              <FormControl className="w-fit">
                <FormLabel htmlFor="city">Cidade</FormLabel>
                <Select
                  id="city"
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

            {methodsForm.getValues().shopAddress?.city !== "" && (
              <FormControl className="w-fit min-w-[17.8rem] justify-start">
                <FormLabel htmlFor="storeName">Endereço da loja</FormLabel>
                <SearchPlaceInput
                  city={methodsForm.watch("shopAddress.city")}
                  stateCode={methodsForm.watch("shopAddress.state_code")}
                  onSelectAddress={(address) =>
                    methodsForm.setValue("shopAddress", address)
                  }
                />
              </FormControl>
            )}

            <VStack className="items-start">
              <Text>Dias de atendimento</Text>
              <ServiceDaysCheckbox
                onChange={(values) =>
                  methodsForm.setValue("shopOpeningHours.daysOfWeek", values)
                }
              />
            </VStack>

            <VStack className="items-start ">
              <Text>Horário de atendimento</Text>
              <HStack className="space-x-4">
                <FormControl className="w-fit">
                  <FormLabel htmlFor="starts">Início</FormLabel>
                  <Input
                    {...methodsForm.register("shopOpeningHours.hours.starts")}
                    type="number"
                    className="w-20 border border-gray-400 text-center"
                    id="starts"
                  />
                </FormControl>
                <FormControl className="w-fit ">
                  <FormLabel htmlFor="ends">Fim</FormLabel>
                  <Input
                    {...methodsForm.register("shopOpeningHours.hours.ends")}
                    type="number"
                    className="w-20 border border-gray-400 text-center"
                    id="ends"
                  />
                </FormControl>
              </HStack>
            </VStack>

            <Button
              // onClick={() => onConfirmShopPerfil(methodsForm.getValues())}
              className="w-32 self-end bg-gray-default text-white"
            >
              Criar
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
}
