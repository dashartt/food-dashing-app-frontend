import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "react-select";
import CreateableSelect from "react-select/creatable";

import PreviewMenuModal from "@/components/modals/PreviewMenuModal";
import useCategories from "@/store/shop/setup/useCategories";
import useMenu from "@/store/shop/setup/useMenu";
import type { IMenu } from "@/types/menu.type";

export default function ShopMenuStep() {
  const { handleSubmit, register, setValue } = useForm<IMenu>();

  const { categories, setCategories } = useCategories();
  const { menu, setMenu } = useMenu();
  const [switchView, setSwitchView] = useState(false);

  const onSubmit = ({
    category,
    item: { name, price, ingredients },
  }: IMenu) => {
    setMenu([
      ...menu,
      {
        category,
        item: {
          name,
          price,
          ...(ingredients && { ingredients }),
        },
      },
    ]);
  };

  return (
    <VStack className="items-start space-y-6">
      <Accordion allowToggle className="space-y-6">
        <AccordionItem className="w-fit min-w-[15rem] rounded-md border border-gray-400">
          <AccordionButton>
            <Text>Adicionar categoria</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel className="pt-6">
            <FormControl className="w-fit">
              <FormLabel>Nome da categoria</FormLabel>
              <CreateableSelect
                menuPortalTarget={document.getElementById("__next")}
                isMulti
                options={categories.map((category) => ({
                  label: category.label,
                }))}
                onChange={(categories_) => setCategories(categories_)}
              />
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem className="w-fit min-w-[15rem] rounded-md border border-gray-400">
          <AccordionButton>
            <Text>Adicionar produto</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack className="w-fit items-start space-y-6 p-4">
                <FormControl>
                  <FormLabel htmlFor="productCategory">
                    Categoria do produto
                  </FormLabel>
                  <SelectInput
                    id="productCategory"
                    menuPortalTarget={document.getElementById("__next")}
                    isClearable
                    isDisabled={categories.length === 0}
                    {...register("category")}
                    onChange={(value) =>
                      setValue("category", value?.label || "")
                    }
                    options={categories}
                    className="w-fit min-w-[12rem]"
                  />
                </FormControl>

                <FormControl className="w-fit">
                  <FormLabel htmlFor="productName">Nome do produto</FormLabel>
                  <Input
                    {...register("item.name")}
                    id="productName"
                    className="border border-gray-400"
                  />
                </FormControl>

                <FormControl className="flex flex-col justify-start">
                  <FormLabel htmlFor="productPrice">Preço do produto</FormLabel>
                  <Input
                    {...register("item.price")}
                    id="productPrice"
                    type="number"
                    className="w-20 border border-gray-400"
                  />
                </FormControl>

                <FormControl className="flex flex-col items-start">
                  <FormLabel
                    className="m-0 w-full p-0"
                    htmlFor="hasIngredients"
                  >
                    Possui ingredientes?
                  </FormLabel>
                  <Switch
                    id="hasIngredients"
                    onChange={(e) => setSwitchView(e.target.checked)}
                  />
                </FormControl>
                {switchView && (
                  <FormControl className="flex flex-col justify-start">
                    <FormLabel htmlFor="productIngredientes">
                      Ingredientes
                    </FormLabel>
                    <Textarea
                      {...register("item.ingredients")}
                      id="productIngredientes"
                      className="max-h-32 w-fit border border-gray-400"
                    />
                  </FormControl>
                )}
                <Button type="submit" className="bg-blue-400 text-white">
                  Salvar
                </Button>
              </VStack>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <PreviewMenuModal />
    </VStack>
  );
}
