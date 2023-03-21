import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IItemCategory } from "@/types/shop.type";

import * as API from "../../../../../../../services/API/shop.service";

export default function ShopCategoriesSettings() {
  const toast = useToast({ position: "top" });
  const { shopId } = useShopSegmentURL();
  const state = useShopSettings();
  const categoryForm = useForm<IItemCategory>();

  const onAddItemCategory = () => {
    const category = categoryForm.getValues();
    state.setShopSettings({
      ...state.shopSettings,
      categories: [...(state.shopSettings?.categories || []), category],
    });
    categoryForm.reset();
  };
  const onRemoveCategory = (name: string) => {
    state.setShopSettings({
      ...state.shopSettings,
      categories: state.shopSettings?.categories?.filter(
        (category) => category.name !== name
      ),
    });
  };

  const onSubmitSettings = () => {
    API.saveShopSettings(shopId, {
      categories: state.shopSettings?.categories,
    }).then((response) => {
      toast({
        title: response.message,
      });
      if (response.message.includes("registradas") && response.data) {
        state.setShopSettings({
          categories: response.data.categories,
        });
      }
    });
  };

  return (
    <VStack className="items-start space-y-10">
      <Box className="space-y-6 rounded-md border border-gray-400 p-4 w-full">
        <Text className="text-center text-xl">Cadastro de categoria</Text>
        <form className="flex flex-col space-y-4">
          <FormControl className="w-fit" id="categoryPortal">
            <FormLabel htmlFor="categoryName">Nome</FormLabel>
            <Input
              {...categoryForm.register("name")}
              className="border border-gray-400"
              id="categoryName"
            />
          </FormControl>
          <FormControl className="flex items-center justify-between space-x-6">
            <FormLabel htmlFor="allowObservation" className="p-0 m-0">
              Permite observações
            </FormLabel>
            <Switch
              id="allowObservation"
              {...categoryForm.register("allowObservation")}
            />
          </FormControl>

          <FormControl className="flex items-center justify-between space-x-6">
            <FormLabel htmlFor="allowHalf" className="p-0 m-0">
              Permite duas opções de recheio
            </FormLabel>
            <Switch id="allowHalf" {...categoryForm.register("allowHalf")} />
          </FormControl>

          <FormControl className="flex items-center justify-between space-x-6">
            <FormLabel htmlFor="allowAdditional" className="p-0 m-0">
              Permite adicionais
            </FormLabel>
            <Switch
              id="allowAdditional"
              {...categoryForm.register("allowAdditional")}
            />
          </FormControl>
          <Button
            onClick={onAddItemCategory}
            className="bg-blue-500 hover:bg-blue-300 active:bg-blue-300 text-white"
          >
            Criar
          </Button>
        </form>
      </Box>
      <Box className="space-y-6 rounded-md border border-gray-400 p-4 w-full">
        <Text className="text-center text-xl">Listagem de categorias</Text>
        <VStack>
          {state.shopSettings?.categories?.map((category) => (
            <Card
              key={category.name}
              className="w-full min-w-[15rem] border border-gray-400"
              variant="outline"
            >
              <CardBody className="relative flex flex-col items-start">
                <Text className="text-xl">{category.name}</Text>
                <Text className="text-gray-600">
                  Observação: {category.allowObservation ? "sim" : "não"}
                </Text>
                <Text className="text-gray-600">
                  Metade recheio: {category.allowHalf ? "sim" : "não"}
                </Text>
                <IconButton
                  className="absolute top-2 right-2 bg-white hover:bg-gray-300 active:bg-gray-300"
                  onClick={() => onRemoveCategory(category.name)}
                  aria-label="Excluir categoria"
                  icon={<MdClose className="text-xl" />}
                />
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Box>
      <Button
        className="self-end bg-blue-500 hover:bg-blue-300 active:bg-blue-300 text-white"
        onClick={onSubmitSettings}
      >
        Salvar alterações
      </Button>
    </VStack>
  );
}
