"use client";

import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { IMenuItem } from "src/types";

type Props = {
  menuItem: IMenuItem | null;
};

export default function MenuItemCardSimple({ menuItem }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!menuItem) return null;
  return (
    <>
      {mounted && (
        <Card
          variant="outline"
          className="mt-4 shadow-lg border border-gray-400 bg-white"
        >
          <CardBody>
            <Heading size="md" className="font-medium">
              {menuItem.name}
            </Heading>
            <Text className="line-clamp-3 text-gray-600 font-semibold">
              {menuItem?.ingredients}
            </Text>
          </CardBody>
        </Card>
      )}
    </>
  );
}
