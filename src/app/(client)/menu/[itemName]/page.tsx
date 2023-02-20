"use client";

import { Box, Text, Textarea, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMenuItemByName } from "src/services/api";
import useAnotherHalfPizzaState from "src/store/pizza/useAnotherHalfPizza";
import usePizzaPrice from "src/store/pizza/usePizzaPrice";
import usePizzaStuffing from "src/store/pizza/usePizzaStuffing";

import AdditionalsAccordion from "@/components/accordions/AdditionalsAccordion";
import AddToCart from "@/components/blocks/add-to-cart/AddToCart";
import MenuItemCard from "@/components/cards/MenuItemCard";
import ListPizzasModal from "@/components/modals/ListPizzaModal";
import PizzaBorderRadio from "@/components/radios/PizzaBorderRadio";
import PizzaFillingRadio from "@/components/radios/PizzaFillingRadio";
import MenuItemCardSimpleSkeleton from "@/components/skeletons/MenuItemCardSimpleSkeleton.";
import useObservationPizzaState from "@/store/pizza/useObservationPizza";
import useAdditionals from "@/store/useAdditionals";

type Params = {
  params: {
    itemName: string;
  };
};

export default function MenuItem({ params }: Params) {
  const [mounted, setMounted] = useState(false);

  const { data: item, isLoading } = useQuery({
    queryKey: [`menuItem/${params.itemName}`],
    queryFn: () => getMenuItemByName(params.itemName),
  });

  // zustand states
  const { setObservation, observation, resetObservation } =
    useObservationPizzaState();
  const anotherHalfPizza = useAnotherHalfPizzaState(
    (state) => state.anotherHalfPizza
  );
  const getDefaultPrice = usePizzaPrice((state) => state.getDefaultPrice);
  const { isHalf, resetStuffing } = usePizzaStuffing();
  const { setItemId } = useAdditionals();

  useEffect(() => {
    setMounted(true);
    resetObservation();
    resetStuffing();
    getDefaultPrice(item?.price || 0);
  }, []);

  useEffect(() => {
    setItemId(item?._id || "");
  }, [item]);

  return (
    <>
      {mounted && (
        <VStack className="items-start space-y-8">
          {/* <Box className="space-y-6"> */}
          {/* Name and ingredients  ----------------> */}
          <VStack className="w-full items-start">
            <Text className="text-lg font-semibold">Sobre o produto</Text>
            {isLoading && <MenuItemCardSimpleSkeleton />}
            {item && <MenuItemCard menuItem={item} />}
          </VStack>

          {/* Whole or half pizza option and get another half pizza */}
          {item?.category?.name.includes("pizza") && (
            <VStack className="items-start">
              <Text className="text-lg font-semibold">Inteira ou metade?</Text>
              <PizzaFillingRadio />
            </VStack>
          )}
          {isHalf && (
            <VStack className="items-start">
              <Text className="text-lg font-semibold ">
                Escolha a outra metade
              </Text>
              <ListPizzasModal />
              {anotherHalfPizza && (
                <MenuItemCard canRemove menuItem={anotherHalfPizza} />
              )}
            </VStack>
          )}
          {/* </Box> */}

          {/* Pizza border type ------------------> */}
          {item?.category?.name.includes("pizza") && (
            <VStack className="items-start text-lg font-semibold">
              <Text>Qual opção de borda?</Text>
              <PizzaBorderRadio />
            </VStack>
          )}

          {/* Additional container */}
          {item?.category.name.includes("pizza") && (
            <Box className="w-full rounded-md border border-gray-400 py-2">
              <AdditionalsAccordion category={item.category.name} />
            </Box>
          )}

          {/* Observation ----------------> */}
          {item?.category.name !== "drinks" && (
            <VStack className="w-full items-start">
              <Text className="text-lg font-semibold">Observações</Text>

              <Textarea
                value={observation}
                onChange={({ target }) => setObservation(target.value)}
                placeholder="Ex: tirar cebola, ovo, etc"
                className="max-h-32 w-full max-w-md border-gray-400"
              />
            </VStack>
          )}

          {/* Change quantity and add to cart ----------------> */}
          <Box className="w-full">
            <AddToCart
              orderItem={{
                item: anotherHalfPizza
                  ? [item || null, anotherHalfPizza]
                  : [item || null],
                observation,
              }}
            />
          </Box>
        </VStack>
      )}
    </>
  );
}
