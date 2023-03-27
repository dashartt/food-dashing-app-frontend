import type { AlertStatus } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { City, State } from "country-state-city";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";

import SearchPlaceInput from "@/components/inputs/SearchPlaceInput";
import { checkShopNameDuplicity } from "@/services/API/shop.service";
// import useSessionState from "@/store/useSession";
import type { IShopSettings } from "@/types/shop.type";
// import { addShop } from "@/services/API/shop.service";

type IOnCheckShopNameAPI = {
  status: string;
  message: string;
} | null;

export default function AddShop() {
  // const toast = useToast();
  const [checkShopNameResponse, setCheckShopNameResponse] =
    useState<IOnCheckShopNameAPI>(null);
  // const { session } = useSessionState();
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
    console.log(methodsForm.getValues());

    // addShop({
    //   ...methodsForm.getValues(),
    //   owner: { _id: session?._id },
    // }).then(({ data, message }) => {
    //   toast({
    //     title: message,
    //     position: "top",
    //   });
    // });
  };

  return (
    <Box className="max-w-fit rounded-md bg-white p-10">
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

            <Button
              onClick={onAddShop}
              className="w-32 self-end bg-blue-500 text-white"
            >
              Criar
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
