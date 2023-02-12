"use client";

import { Box, Text, Textarea, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMenuItemByName } from "src/services/api";
import useAnotherHalfPizzaState from "src/store/pizza/useAnotherHalfPizza";
import usePizzaPrice from "src/store/pizza/usePizzaPrice";
import usePizzaStuffing from "src/store/pizza/usePizzaStuffing";

import AddToCart from "@/components/blocks/add-to-cart/AddToCart";
import MenuItemCard from "@/components/cards/MenuItemCard";
import ListPizzasModal from "@/components/modals/ListPizzaModal";
import PizzaFillingRadio from "@/components/radios/PizzaFillingRadio";
import MenuItemCardSimpleSkeleton from "@/components/skeletons/MenuItemCardSimpleSkeleton.";
import useObservationPizzaState from "@/store/pizza/useObservationPizza";
import { getCategoryName } from "@/utils";

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

  useEffect(() => {
    setMounted(true);
    resetObservation();
    resetStuffing();
    getDefaultPrice(item?.price || 0);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start space-y-4 md:w-96">
          <Box className="w-full space-y-4 px-4">
            {/* Product chosen  ----------------> */}
            <VStack className="items-start space-y-0">
              <Text className="text-lg font-semibold">Produto escolhido</Text>
              <Text>{getCategoryName(item?.category.name)}</Text>
            </VStack>

            {/* Whole or half pizza option and get another half pizza */}
            {item?.category?.name.includes("pizza") && (
              <VStack className="items-start space-y-1">
                <Text className="text-lg font-semibold">Tipo de recheio</Text>
                <PizzaFillingRadio />
              </VStack>
            )}

            {/* Name and ingredients  ----------------> */}
            <VStack className="w-full items-start space-y-1">
              {!item?.category.name.includes("drinks") && (
                <Text className="text-lg font-semibold">Recheio escolhido</Text>
              )}
              {isLoading && <MenuItemCardSimpleSkeleton />}
              {item && <MenuItemCard menuItem={item} />}
            </VStack>

            {isHalf && (
              <VStack className="items-start space-y-1">
                <Text className="text-lg font-semibold ">
                  A outra metade do recheio
                </Text>
                <ListPizzasModal />
                {anotherHalfPizza && (
                  <MenuItemCard canRemove menuItem={anotherHalfPizza} />
                )}
              </VStack>
            )}
          </Box>

          {/* Observation ----------------> */}
          {item?.category.name !== "drinks" && (
            <Box className="w-full space-y-2 p-4">
              <Text className="text-lg  font-semibold">Observações</Text>
              <Box>
                <Textarea
                  value={observation}
                  onChange={({ target }) => setObservation(target.value)}
                  placeholder="Ex: tirar cebola, ovo, etc"
                  className="border-gray-400"
                />
              </Box>
            </Box>
          )}

          {/* Change quantity and add to cart ----------------> */}
          <Box className="w-full px-4">
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
