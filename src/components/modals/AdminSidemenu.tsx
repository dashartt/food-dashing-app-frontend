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
                    src="data:image/jpeg;base64,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"
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
