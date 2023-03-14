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
import { useRef } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "react-select";
import type Select from "react-select/dist/declarations/src/Select";

import PreviewAdditionalModal from "@/components/modals/PreviewAdditionalModal";
import useAdditional from "@/store/shop/setup/useAdditionals";
import useCategories from "@/store/shop/setup/useCategories";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IAdditional } from "@/types/shop/menu.type";

export default function ShopAdditionalSetup() {
  const { setShopSettings, shopSettings } = useShopSettings();

  const additionalForm = useForm<IAdditional>();
  const { ref: additionalRegisterRef, ...rest } =
    additionalForm.register("categories");

  const categoriesInputRef = useRef<Select>(null);

  const { additional, setAdditional } = useAdditional();
  const { categories } = useCategories();

  const onAddAdditional = () => {
    const values = additionalForm.getValues();
    const additionalUpdated = [
      ...additional,
      { ...values, price: Number(values.price) },
    ];
    setAdditional(additionalUpdated);
    setShopSettings({ ...shopSettings, additional: additionalUpdated });

    additionalForm.reset();
    categoriesInputRef.current?.clearValue();
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
            <form>
              <VStack className="items-start space-y-6">
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
                    isDisabled={categories.length === 0}
                    {...rest}
                    onChange={(value) =>
                      additionalForm.setValue("categories", [
                        ...value.map((v) => ({
                          name: v.label,
                        })),
                      ])
                    }
                    options={categories.map((category) => ({
                      label: category,
                      value: category,
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
                    {...additionalForm.register("price")}
                    className="w-20 border border-gray-400"
                  />
                </FormControl>
                <Button
                  onClick={onAddAdditional}
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
