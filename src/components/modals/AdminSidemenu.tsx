"use client";

import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
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

export default function AdminSidemenu() {
  const [mounted, setMounted] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          <IconButton
            aria-label="ver menu"
            className="rounded-none"
            onClick={onOpen}
            icon={<GiHamburgerMenu className="text-2xl text-white" />}
          />
          <Drawer
            size="full"
            placement="left"
            onClose={onClose}
            isOpen={isOpen}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton className="text-md m-4" />
              <DrawerHeader className="border-b">
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
              <DrawerBody>
                <VStack>
                  <Button
                    onClick={() => {
                      onClose();
                      router.push("/admin/orders/to-do");
                    }}
                    className="flex w-full justify-start space-x-4 rounded-none "
                  >
                    <Icon className="text-2xl" as={RiFileList3Line} />
                    <Text>Pedidos a fazer</Text>
                  </Button>

                  <Button
                    onClick={() => {
                      onClose();
                      router.push("/admin/orders/in-progress");
                    }}
                    className="flex w-full justify-start space-x-4 rounded-none "
                  >
                    <Icon className="text-2xl" as={RiFileList3Line} />
                    <Text>Pedidos em andamento</Text>
                  </Button>

                  <Button
                    onClick={() => {
                      onClose();
                      router.push("/admin/oven");
                    }}
                    className="flex w-full justify-start space-x-4 rounded-none "
                  >
                    <Icon className="text-2xl" as={GiFireBowl} />
                    <Text>Forno</Text>
                  </Button>

                  <Button
                    onClick={() => {
                      onClose();
                      router.push("/admin/delivery");
                    }}
                    className="flex w-full justify-start space-x-4 rounded-none"
                  >
                    <Icon className="text-2xl" as={MdOutlineDeliveryDining} />
                    <Text>Entregas</Text>
                  </Button>

                  <Button
                    onClick={() => {
                      onClose();
                      router.push("/admin/history");
                    }}
                    className="flex w-full justify-start space-x-4 rounded-none"
                  >
                    <Icon className="text-2xl" as={BsCardChecklist} />
                    <Text>Histórico</Text>
                  </Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
