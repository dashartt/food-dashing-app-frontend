"use client";

import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start md:w-96">
          <Box className="w-full p-4">
            <HStack className="rounded-md border border-gray-400 shadow-lg">
              <Box className="rounded-full bg-white p-1">
                <Avatar name="Pizzaria logo" size="lg" src="/static/logo.png" />
              </Box>
              <Heading className="w-full p-4 text-2xl">
                Macaco Louco <br />
                Pizzaria
              </Heading>
            </HStack>
          </Box>

          <Box className="m-4 space-y-2">
            <Text className="text-md text-xl font-semibold">Endereço</Text>
            <Link
              href="https://goo.gl/maps/pwPAsAXuVGV4AzBp6"
              className="flex items-center justify-between rounded-md border border-gray-400 p-4 shadow-lg"
            >
              <Text className="text-gray-700 ">
                Rua O, 140 - Novo Horizonte, Ilha Solteira - SP, 15385-000,
                Brasil
              </Text>
              <RiArrowRightSLine className="text-5xl text-gray-700" />
            </Link>
          </Box>

          <Box className="w-full p-4 space-y-2">
            <Text className="text-md text-xl font-semibold">
              Formas de pagamento
            </Text>
            <VStack className="w-full items-start space-y-0 rounded-md border border-gray-400 p-4 shadow-lg">
              <Text>Cartões: crédito e débito</Text>
              <Text>Pix: (18) 98137-1989</Text>
              <Text>Dinheiro</Text>
            </VStack>
          </Box>

          <Box className="w-full p-4 space-y-2">
            <Text className="text-md text-xl font-semibold">
              Horário de atendimento
            </Text>
            <Box className="space-y-4 rounded-md border border-gray-400 p-4 shadow-lg">
              <Text>
                De terça-feira à domingo <br />A partir de 19h00 até 23h30
              </Text>
              <Text>Obs: segunda-feira não abre</Text>
            </Box>
          </Box>
        </VStack>
      )}
    </>
  );
}
