"use client";

import { Box, Heading, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import BackPageBtn from "src/components/buttons/BackPageBtn";
import MenuItemCardSimple from "src/components/cards/MenuItemCardSimple";
import ListPizzas from "src/components/selects/ListPizzas";
import WholeOrHalfPizzaOption from "src/components/switchs/WholeOrHalfPizzaOption";
import { getMenuItemByName } from "src/services/api";
import useAnotherHalfPizzaState from "src/store/pizza/useAnotherHalfPizza";
import usePizzaPrice from "src/store/pizza/usePizzaPrice";
import usePizzaStuffing from "src/store/pizza/usePizzaStuffing";

import AddToCart from "@/components/blocks/add-to-cart/AddToCart";
import useObservationPizzaState from "@/store/pizza/useObservationPizza";

type Params = {
  params: {
    itemName: string;
  };
};

export default function MenuItem({ params }: Params) {
  const [mounted, setMounted] = useState(false);

  const { data: item } = useQuery({
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
  const isHalfPizza = usePizzaStuffing((state) => state.isHalf);

  useEffect(() => {
    setMounted(true);
    resetObservation();
    getDefaultPrice(item?.price || 0);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start space-y-4 mb-20">
          {/* Name and back page btn  ----------------> */}
          <HStack className="p-4 border-b-2 w-full border-gray-300">
            <BackPageBtn />
            <Heading size="lg">Detalhes do item</Heading>
          </HStack>

          <Box className="mx-4 space-y-4">
            {/* Name and ingredients  ----------------> */}
            <Box className="w-full">
              <MenuItemCardSimple menuItem={item || null} />
            </Box>

            {/* Whole or half pizza option and get another half pizza */}
            {item?.category?.name.includes("pizza") && (
              <Box className="">
                <Text>Vou querer:</Text>
                <WholeOrHalfPizzaOption />
              </Box>
            )}
            {isHalfPizza && (
              <>
                <ListPizzas />
                <MenuItemCardSimple menuItem={anotherHalfPizza} />
              </>
            )}
          </Box>

          {/* Observation ----------------> */}
          {item?.category.name !== "drinks" && (
            <Box className="w-full p-4 space-y-2">
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
