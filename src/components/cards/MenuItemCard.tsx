"use client";

import {
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import type { IMenuItem } from "src/types";

import useAnotherHalfPizzaState from "@/store/pizza/useAnotherHalfPizza";
import { StoreCallback } from "@/utils";

type Props = {
  menuItem: IMenuItem;
  hasPrice?: boolean;
  canRemove?: boolean;
  asButton?: boolean;
};

export default function MenuItemCard({
  menuItem,
  hasPrice = false,
  asButton = false,
  canRemove = false,
}: Props) {
  const router = useRouter();
  const path = usePathname();
  const [canDeleteHalf, setCanDeleteHalf] = useBoolean();
  const { getAnotherHalf, resetAnotherHalf } = useAnotherHalfPizzaState();

  const clickHandler = () => {
    if (path === "/") router.push(`/menu/${menuItem.name}`);
    if (path?.includes("/menu/")) {
      StoreCallback.fireCallback({ key: "ListPizzaModal/onClose" });
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
      <CardBody className="space-y-2">
        <HStack className="justify-between">
          <Heading size="md" className="font-normal">
            {menuItem.name}
          </Heading>
          {canRemove && (
            <IconButton
              onClick={setCanDeleteHalf.on}
              size="sm"
              aria-label="Remover item do pedido"
              className="bg-transparent"
              icon={<RiCloseLine className="text-2xl text-red-600 " />}
            />
          )}
        </HStack>
        <Text className="text-gray-600  line-clamp-3">
          {menuItem?.ingredients}
        </Text>
        {hasPrice && <Text className="mt-2 text-xl">R$ {menuItem.price}</Text>}
      </CardBody>
    </Card>
  );
}
