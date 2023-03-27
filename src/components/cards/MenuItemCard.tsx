"use client";

import {
  Card,
  CardBody,
  Heading,
  IconButton,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import useAnotherHalfPizzaState from "@/store/pizza/useAnotherHalfPizza";
import type { IMenuItem } from "@/types/shop.type";

type Props = {
  menuItem: IMenuItem | null;
  canRemove?: boolean;
  asButton?: boolean;
};

export default function MenuItemCard({
  menuItem,
  asButton = false,
  canRemove = false,
}: Props) {
  const { baseURL, path, router } = useShopSegmentURL();

  const [canDeleteHalf, setCanDeleteHalf] = useBoolean();
  const { getAnotherHalf, resetAnotherHalf } = useAnotherHalfPizzaState();

  const clickHandler = () => {
    if (baseURL === path) {
      router.push(`${baseURL}/menu/${menuItem?.name}`);
    }
    if (path?.includes("/menu/")) {
      getAnotherHalf(menuItem);
    }
  };

  useEffect(() => {
    if (canDeleteHalf) resetAnotherHalf();
  }, [canDeleteHalf]);

  return (
    <Card
      {...(asButton && { role: "button" })}
      onClick={clickHandler}
      variant="outline"
      className="w-full max-w-sm border border-gray-400 bg-white shadow-lg"
    >
      <CardBody className="space-y-2 relative">
        <Heading size="md" className="font-normal">
          {menuItem?.name}
        </Heading>
        {canRemove && (
          <IconButton
            onClick={setCanDeleteHalf.on}
            size="sm"
            aria-label="Remover item do pedido"
            className="bg-transparent absolute top-2 right-2"
            icon={<RiCloseLine className="text-2xl text-red-600 " />}
          />
        )}
        <Text className="text-gray-600  line-clamp-3">
          {menuItem?.ingredients}
        </Text>
        <Text className="mt-2 text-xl">R$ {menuItem?.price}</Text>
      </CardBody>
    </Card>
  );
}
