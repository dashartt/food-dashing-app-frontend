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
  Select,
  Spacer,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import PreviewCategoriesModal from "@/components/modals/PreviewCategoriesModal";
import PreviewMenuModal from "@/components/modals/PreviewMenuModal";
import useCategories from "@/store/shop/setup/useCategories";
import useMenu from "@/store/shop/setup/useMenu";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IItemCategory, IMenuItem } from "@/types/shop/menu.type";

export default function ShopMenuStep() {
  const { setShopSettings, shopSettings } = useShopSettings();
  const categoryForm = useForm<IItemCategory>();
  const menuItemForm = useForm<IMenuItem & { hasIngredients: boolean }>();

  const { categories, setCategories } = useCategories();
  const { menu, setMenu } = useMenu();

  const onAddItemCategory = () => {
    const categoriesUpdated = [...categories, categoryForm.getValues().name];
    setCategories(categoriesUpdated);
    setShopSettings({
      ...shopSettings,
      categories: categoriesUpdated.map((c) => ({ name: c })),
    });
    categoryForm.resetField("name");
  };

  const onAddMenuItem = () => {
    const { name, price, ingredients, category } = menuItemForm.getValues();
    const menuUpdated = [
      ...menu,
      {
        category: { name: category.name },
        name,
        price,
        ...(ingredients && { ingredients }),
      },
    ];
    setMenu(menuUpdated);
    setShopSettings({
      ...shopSettings,
      menu: menuUpdated,
    });
    menuItemForm.reset();
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
          <AccordionPanel className="flex flex-col pt-6">
            <FormControl className="w-fit" id="categoryPortal">
              <FormLabel htmlFor="categoryName">Nome da categoria</FormLabel>
              <Input
                {...categoryForm.register("name")}
                className="border border-gray-400"
                id="categoryName"
              />
            </FormControl>
            <Button className="self-end" onClick={onAddItemCategory}>
              Criar
            </Button>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem className="w-fit min-w-[15rem] rounded-md border border-gray-400">
          <AccordionButton>
            <Text>Adicionar produto</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <form>
              <VStack className="w-fit items-start space-y-6 p-4">
                <FormControl>
                  <FormLabel htmlFor="productCategory">
                    Categoria do produto
                  </FormLabel>
                  <Select
                    id="productCategory"
                    isDisabled={categories.length === 0}
                    {...menuItemForm.register("category.name")}
                    className="w-fit min-w-[12rem]"
                  >
                    <option className="hidden" value="">
                      Escolher
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className="w-fit">
                  <FormLabel htmlFor="productName">Nome do produto</FormLabel>
                  <Input
                    {...menuItemForm.register("name")}
                    id="productName"
                    className="border border-gray-400"
                  />
                </FormControl>

                <FormControl className="flex flex-col justify-start">
                  <FormLabel htmlFor="productPrice">Preço do produto</FormLabel>
                  <Input
                    {...menuItemForm.register("price")}
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
                    {...menuItemForm.register("hasIngredients")}
                  />
                </FormControl>

                {menuItemForm.watch("hasIngredients") && (
                  <FormControl className="flex flex-col justify-start">
                    <FormLabel htmlFor="productIngredientes">
                      Ingredientes
                    </FormLabel>
                    <Textarea
                      {...menuItemForm.register("ingredients")}
                      id="productIngredientes"
                      className="max-h-32 w-fit border border-gray-400"
                    />
                  </FormControl>
                )}
                <Button
                  onClick={onAddMenuItem}
                  className="self-end bg-blue-500 text-white"
                >
                  Salvar
                </Button>
              </VStack>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <PreviewCategoriesModal />
      <PreviewMenuModal />
    </VStack>
  );
}
