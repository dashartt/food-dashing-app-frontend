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
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import SelectInput from "react-select";

import PreviewAdditionalModal from "@/components/modals/PreviewAdditionalModal";
import useAdditional from "@/store/shop/setup/useAdditionals";
import useCategories from "@/store/shop/setup/useCategories";
import type { IAdditional } from "@/types/shop/menu";

export default function ShopAdditionalSetup() {
  const { handleSubmit, register, setValue } = useForm<IAdditional>();
  const { additional, setAdditional } = useAdditional();
  const { categories } = useCategories();

  const onSubmit = (values: IAdditional) => {
    setAdditional([
      ...additional,
      {
        name: values.name,
        price: values.price,
        categories: values.categories.map((category) => ({
          name: category?.name || "",
        })),
      },
    ]);
  };

  return (
    <VStack className="items-start space-y-6">
      <Accordion allowToggle>
        <AccordionItem className="rounded-md border border-gray-400">
          <AccordionButton>
            <Text>Criar adicional</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack className="items-start space-y-6">
                <FormControl>
                  <FormLabel htmlFor="additionalCategory">Categoria</FormLabel>

                  <SelectInput
                    id="additionalCategory"
                    menuPortalTarget={document.getElementById("__next")}
                    isClearable
                    isMulti
                    isDisabled={categories.length === 0}
                    {...register("categories")}
                    onChange={(value) =>
                      setValue("categories", [
                        ...value.map((v) => ({
                          name: v.label,
                        })),
                      ])
                    }
                    options={categories}
                    className="w-fit min-w-[12rem]"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="additionalName">Nome</FormLabel>
                  <Input
                    id="additionalName"
                    {...register("name")}
                    className="border border-gray-400"
                  />
                </FormControl>
                <FormControl className="flex flex-col justify-start">
                  <FormLabel htmlFor="additionalPrice">Preço</FormLabel>
                  <Input
                    id="additionalPrice"
                    type="number"
                    {...register("price")}
                    className="w-20 border border-gray-400"
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="self-end bg-blue-500 text-white"
                >
                  Salvar
                </Button>
              </VStack>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <PreviewAdditionalModal />
    </VStack>
  );
}
