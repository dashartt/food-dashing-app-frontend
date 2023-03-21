import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import CreateableMenu from "@/components/tabs/CreateableMenu";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IMenuItem } from "@/types/shop.type";

import * as API from "../../../../../../../services/API/shop.service";

export default function ShopItemsSettings() {
  const toast = useToast({ position: "top" });
  const { shopId } = useShopSegmentURL();
  const productForm = useForm<IMenuItem & { hasIngredients: boolean }>();

  const { shopSettings, setShopSettings } = useShopSettings();

  const onSubmitSettings = () => {
    const product = productForm.getValues();
    const payload = {
      ...product,
      category: shopSettings?.categories?.find(
        (c) => c.name === product.category.name
      ),
    } as IMenuItem;

    API.saveShopSettings(shopId, {
      items: [...(shopSettings?.items || []), payload],
    }).then((response) => {
      toast({
        title: response.message,
      });
      if (response.message.includes("registradas") && response.data) {
        setShopSettings({ ...response.data });
        productForm.reset();
      }
    });
  };

  return (
    <VStack className="items-start space-y-10">
      <Box className="w-full space-y-6 rounded-md border border-gray-400 p-4">
        <Text className="text-center text-xl">
          Adicione produto ao cardápio
        </Text>
        <form className="flex flex-col space-y-6">
          <FormControl>
            <FormLabel htmlFor="productCategory">
              Categoria do produto
            </FormLabel>
            <Select
              id="productCategory"
              isDisabled={shopSettings?.categories?.length === 0}
              className="border border-gray-400"
              {...productForm.register("category.name")}
            >
              <option className="hidden" value="">
                Escolher
              </option>
              {shopSettings?.categories?.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="productName">Nome</FormLabel>
            <Input
              {...productForm.register("name")}
              id="productName"
              className="border border-gray-400"
            />
          </FormControl>

          <FormControl className="flex flex-col justify-start">
            <FormLabel htmlFor="productPrice">Preço</FormLabel>
            <Input
              {...productForm.register("price", { valueAsNumber: true })}
              id="productPrice"
              type="number"
              className="w-20 border border-gray-400"
            />
          </FormControl>

          <FormControl className="flex flex-col items-start">
            <FormLabel className="m-0 w-full p-0" htmlFor="hasIngredients">
              Possui ingredientes?
            </FormLabel>
            <Switch
              id="hasIngredients"
              {...productForm.register("hasIngredients")}
            />
          </FormControl>

          {productForm.watch("hasIngredients") && (
            <FormControl className="flex flex-col justify-start">
              <FormLabel htmlFor="productIngredientes">Ingredientes</FormLabel>
              <Textarea
                {...productForm.register("ingredients")}
                id="productIngredientes"
                className="max-h-32 w-full border border-gray-400"
              />
            </FormControl>
          )}
          <Button
            onClick={onSubmitSettings}
            className="self-end bg-blue-500 text-white hover:bg-blue-300 active:bg-blue-300"
          >
            Criar
          </Button>
        </form>
      </Box>
      <Box className="w-full space-y-6 rounded-md border border-gray-400 p-4">
        <Text className="text-center text-xl">Preview do cardápio</Text>

        <CreateableMenu
          categories={shopSettings?.categories || []}
          menu={shopSettings?.items || []}
        />
      </Box>
    </VStack>
  );
}
