import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "react-select";
import type ISelectInput from "react-select/dist/declarations/src/Select";

import AdditionalTabs from "@/components/tabs/AdditionalTabs";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IAdditional } from "@/types/shop.type";

import * as API from "../../../../../../../services/API/shop.service";

export default function ShopAdditionalSettings() {
  const state = useShopSettings();
  const toast = useToast({ position: "top" });
  const { shopId } = useShopSegmentURL();

  const additionalForm = useForm<IAdditional>();
  const { ref: additionalRegisterRef, ...rest } =
    additionalForm.register("categories");
  const categoriesInputRef = useRef<ISelectInput>();

  const onAddAdditional = () => {
    API.saveShopSettings(shopId, {
      additional: [
        ...(state.shopSettings?.additional || []),
        { ...additionalForm.getValues() },
      ],
    }).then((response) => {
      toast({
        title: response.message,
      });
      if (response.message.includes("registradas") && response.data) {
        state.setShopSettings({ ...response.data });
      }
    });

    additionalForm.reset();
    categoriesInputRef.current?.clearValue();
  };

  return (
    <VStack className="items-start space-y-6">
      <Box className="w-full rounded-md border border-gray-400 p-4">
        <form className="flex flex-col space-y-6">
          <Text className="text-center text-xl">Cadastro de adicional</Text>
          <FormControl>
            <FormLabel htmlFor="additionalCategory">Categoria</FormLabel>
            <SelectInput
              ref={(ref) => {
                additionalRegisterRef(ref);
                categoriesInputRef.current = ref;
              }}
              id="additionalCategory"
              backspaceRemovesValue={false}
              isMulti
              isDisabled={state.shopSettings?.categories?.length === 0}
              {...rest}
              onChange={(value) =>
                additionalForm.setValue("categories", [
                  ...value.map((a) => ({
                    _id: a.value,
                    name: a.label,
                  })),
                ])
              }
              options={state.shopSettings?.categories?.map((category) => ({
                label: category?.name,
                value: category?._id,
              }))}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="additionalName">Nome</FormLabel>
            <Input
              id="additionalName"
              {...additionalForm.register("name")}
              className="border border-gray-400"
            />
          </FormControl>
          <FormControl className="flex flex-col justify-start">
            <FormLabel htmlFor="additionalPrice">Preço</FormLabel>
            <Input
              id="additionalPrice"
              type="number"
              {...additionalForm.register("price", { valueAsNumber: true })}
              className="w-20 border border-gray-400"
            />
          </FormControl>
          <Button
            onClick={onAddAdditional}
            className="self-end bg-blue-500 text-white hover:bg-blue-300 active:bg-blue-300"
          >
            Criar
          </Button>
        </form>
      </Box>

      <Box className="w-full space-y-6 rounded-md border border-gray-400 p-4">
        <Text className="text-center text-xl">Listagem de adicionais</Text>
        <AdditionalTabs
          categories={state.shopSettings?.categories || []}
          additional={state.shopSettings?.additional || []}
        />
      </Box>
    </VStack>
  );
}
