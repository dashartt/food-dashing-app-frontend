"use client";

import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";

import useAdditionals from "@/store/useAdditionals";
import useShoppingCart from "@/store/useShoppingCart";
import type { ICartItem } from "@/types";
import * as utils from "@/utils";

import QuantityInput from "../inputs/QuantityInput";
import ItemCartModal from "../modals/ItemCartModal";

type Props = {
  itemCart: Omit<ICartItem, "quantity">;
};

export default function ItemCartCard({ itemCart }: Props) {
  const [mounted, setMounted] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const shoppingCart = useShoppingCart();
  const { setInitialValue } = useAdditionals();

  const initialQuantity =
    shoppingCart.getItemById(itemCart._id || "")?.quantity || 1;

  const canSetOneHalf = itemCart.item.length > 1 ? "½" : "-";

  const onUpdateQuantity = (quantity: number) => {
    shoppingCart.updateItem(itemCart._id || "", { ...itemCart, quantity });
  };

  const onClickEditModal = () => setEditModalVisible((prev) => !prev);

  const onRemoveItem = () => {
    if (itemCart.additional && itemCart.additional?.length > 0)
      setInitialValue([]);
    shoppingCart.removeItem(itemCart._id || "");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Card className="w-full min-w-[20rem] border border-gray-400 bg-white shadow-lg">
          <CardBody>
            <VStack className="items-start">
              <HStack className="w-full justify-between">
                <VStack className="items-start -space-y-1">
                  <Text className="mb-2 rounded-md py-1 px-2">
                    {itemCart.item[0]?.category.name}
                  </Text>
                  <Text className="text-xl">
                    {canSetOneHalf} {itemCart.item[0]?.name}
                  </Text>
                  {itemCart.item[1]?.name && (
                    <Text className="text-xl">
                      {canSetOneHalf} {itemCart.item[1]?.name}
                    </Text>
                  )}

                  {/* Border type ---------------> */}
                  {/* <VStack className="items-start space-y-2 pt-2">
                    {itemCart.item[0]?.category.name.includes("pizza") && (
                      <Text>
                        {`borda:
                        ${
                          itemCart.borderType === "none"
                            ? " sem borda"
                            : itemCart.borderType
                        }`}
                      </Text>
                    )} */}
                  <VStack className="items-start space-y-2 pt-2">
                    {/* Observation ------------> */}
                    {itemCart.observation && (
                      <Text className="leading-tight">
                        observações: {itemCart.observation}
                      </Text>
                    )}

                    {/* Additionals ----------------> */}
                    {itemCart.item[0]?.category.allowAdditional &&
                      itemCart.additional &&
                      itemCart.additional.length > 0 && (
                        <Text className="lowercase leading-tight">
                          {`adicionais:
                          ${itemCart.additional
                            ?.map(({ name }) => name)
                            .join(", ")}`}
                        </Text>
                      )}
                  </VStack>
                </VStack>

                <VStack className="self-start">
                  <IconButton
                    onClick={onRemoveItem}
                    size="sm"
                    aria-label="Remover item do pedido"
                    className="self-start rounded-full bg-transparent"
                    icon={<RiCloseLine className="text-2xl text-red-500 " />}
                  />
                  <IconButton
                    onClick={onClickEditModal}
                    size="sm"
                    aria-label="editar item do carrinho"
                    className="self-start rounded-full bg-transparent"
                    icon={<BiEditAlt className="text-2xl" />}
                  />
                  {editModalVisible && <ItemCartModal item={itemCart} />}
                </VStack>
              </HStack>

              <HStack className="w-full justify-between">
                <QuantityInput
                  initialQuantity={initialQuantity}
                  onChange={onUpdateQuantity}
                />
                <Text className="text-lg">
                  R$
                  {utils.formatCurrency(
                    shoppingCart.getTotalItemPrice(itemCart._id || "")
                  )}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
