"use client";

import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { IMenuItem } from "src/types";

type Props = {
  menuItem: IMenuItem;
};

export default function MenuItemCard({ menuItem }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Link
          className="w-full"
          href={{
            pathname: "/menu-item",
            query: { q: menuItem.name },
          }}
        >
          <Card variant="outline" className="rounded-none">
            <CardBody>
              <Heading size="sm" className="font-medium">
                {menuItem.name}
              </Heading>
              <Text className="line-clamp-3 text-gray-600">
                {menuItem?.ingredients}
              </Text>
              <Text className="mt-2 text-xl font-semibold text-[#1a95f3]">
                R$ {menuItem.price}
              </Text>
            </CardBody>
          </Card>
        </Link>
      )}
    </>
  );
}
