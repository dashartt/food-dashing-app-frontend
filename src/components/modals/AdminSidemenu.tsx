"use client";

import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCardChecklist } from "react-icons/bs";
import { GiFireBowl, GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { v4 as uuid } from "uuid";

import useSessionState from "@/store/useSession";

const buttonsMap = [
  {
    path: "/admin/orders/to-do",
    text: "Pedidos a fazer",
    icon: RiFileList3Line,
  },
  {
    path: "/admin/orders/in-progress",
    text: "Pedidos em andamento",
    icon: RiFileList3Line,
  },
  {
    path: "/admin/oven",
    text: "Forno",
    icon: GiFireBowl,
  },
  {
    path: "/admin/delivery",
    text: "Entregas",
    icon: MdOutlineDeliveryDining,
  },
  {
    path: "/admin/history",
    text: "Histórico",
    icon: BsCardChecklist,
  },
];

export default function AdminSidemenu() {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { clearSession } = useSessionState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          <IconButton
            aria-label="ver menu"
            className="rounded-none bg-transparent"
            onClick={onOpen}
            icon={<GiHamburgerMenu className="text-2xl text-white" />}
          />
          <Drawer
            size={{ base: "full", lg: "xs" }}
            placement="left"
            onClose={onClose}
            isOpen={isOpen}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton className="text-md m-4" />
              <DrawerHeader className="border-b-2 border-gray-300">
                <HStack className="space-x-4">
                  <Avatar
                    name="Pizzaria logo"
                    size="md"
                    src="/static/logo.png"
                  />
                  <VStack className="items-start -space-y-2">
                    <Text>Macaco Louco</Text>
                    <Text>Admin</Text>
                  </VStack>
                </HStack>
              </DrawerHeader>
              <DrawerBody className="my-4">
                <VStack className="items-start">
                  {buttonsMap.map(({ text, path, icon }) => (
                    <Button
                      key={uuid()}
                      onClick={() => {
                        onClose();
                        router.push(path);
                      }}
                      className="flex w-full justify-start space-x-4 bg-transparent"
                    >
                      <Icon className="text-2xl" as={icon} />
                      <Text>{text}</Text>
                    </Button>
                  ))}
                </VStack>
              </DrawerBody>
              <DrawerFooter className="flex justify-start">
                <Button
                  onClick={() => clearSession()}
                  className="bg-gray-400 px-5"
                >
                  Sair
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
