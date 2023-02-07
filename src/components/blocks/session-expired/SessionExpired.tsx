"use client";

import { Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SessionExpired() {
  const router = useRouter();

  return (
    <VStack className="bg-[#637eab] h-screen w-full">
      <VStack className="items-start m-10 space-y-10 bg-white p-10 max-w-md rounded-md">
        <Text className="text-2xl underline underline-offset-4 font-semibold">
          É necessário se auntenticar
        </Text>
        <Text className="text-xl text-justify">
          Para continuar com seu acesso, clique no botão abaixo e entre com sua
          conta
        </Text>
        <Button
          className="bg-blue-500 text-white self-end"
          onClick={() => router.push("/auth")}
        >
          Entrar
        </Button>
      </VStack>
    </VStack>
  );
}
