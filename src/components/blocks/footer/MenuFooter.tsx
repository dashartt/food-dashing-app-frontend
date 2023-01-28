"use client";

import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { v4 as uuid } from "uuid";

const buttonsMap = [
  {
    path: "/cart",
    text: "Carrinho",
    icon: BsCart3,
  },
  {
    path: "/history",
    text: "Pedidos",
    icon: RiFileList3Line,
  },
  {
    path: "/identification",
    text: "Conta",
    icon: MdManageAccounts,
  },
];

export default function MenuFooter() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <HStack className="fixed bottom-0 w-full justify-between border-t-2 border-gray-300 bg-white p-2">
          {buttonsMap.map(({ text, path, icon }) => (
            <Button
              key={uuid()}
              onClick={() => router.push(path)}
              className="flex w-full space-x-2 bg-white"
            >
              <Icon className="text-xl" as={icon} />
              <Text>{text}</Text>
            </Button>
          ))}
        </HStack>
      )}
    </>
  );
}
