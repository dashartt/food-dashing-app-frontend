"use client";

import {
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";

export default function FooterMenu() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Card
          className="fixed bottom-0 w-full bg-white rounded-none"
          variant="outline"
        >
          <CardBody className="p-2">
            <HStack className="justify-between">
              <Button
                onClick={() => router.push("/cart")}
                className="flex items-center space-x-2 w-full"
              >
                <BsCart3 />
                <Text>Carrinho</Text>
              </Button>
              <Divider orientation="vertical" />
              <Button
                // onClick={() => router.push("/orders")}
                className="flex items-center space-x-2 w-full"
              >
                <RiFileList3Line />
                <Text>Pedidos</Text>
              </Button>
            </HStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
