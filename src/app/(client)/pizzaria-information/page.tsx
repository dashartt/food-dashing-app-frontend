"use client";

import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import BackPageBtn from "src/components/buttons/BackPageBtn";

export default function PizzariaInformation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start md:w-96">
          <HStack className="p-4 border-b-2 w-full border-gray-300 bg-white">
            <BackPageBtn />
            <Text className="text-lg font-semibold">
              Sobre o estabelecimento
            </Text>
          </HStack>

          <Box className="w-full p-4 ">
            <HStack className="border border-gray-400 rounded-md">
              <Box className="rounded-full bg-white p-1">
                <Avatar name="Pizzaria logo" size="lg" src="/static/logo.png" />
              </Box>
              <Heading className="p-4 text-2xl w-full">
                Macaco Louco <br />
                Pizzaria
              </Heading>
            </HStack>
          </Box>

          <Box className="m-4">
            <Text className="text-md text-xl font-semibold">Endereço</Text>
            <Link
              href="https://goo.gl/maps/pwPAsAXuVGV4AzBp6"
              className="flex items-center justify-between border border-gray-400 rounded-md p-4"
            >
              <Text className="text-gray-700 ">
                Rua O, 140 - Novo Horizonte, Ilha Solteira - SP, 15385-000,
                Brasil
              </Text>
              <RiArrowRightSLine className="text-5xl text-gray-700" />
            </Link>
          </Box>

          <Box className="w-full p-4">
            <Text className="text-md text-xl font-semibold">
              Formas de pagamento
            </Text>
            <VStack className="items-start space-y-0 border border-gray-400 p-4 w-full rounded-md">
              <Text>Cartões: cŕedito e débito</Text>
              <Text>Pix: (18) 98137-1989</Text>
              <Text>Dinheiro</Text>
            </VStack>
          </Box>

          <Box className="w-full p-4">
            <Text className="text-md text-xl font-semibold">
              Horário de atendimento
            </Text>
            <Box className="p-4 border border-gray-400 rounded-md space-y-4">
              <Text>
                De terça-feira à domingo <br />A partir as 19h00 até 23h30
              </Text>
              <Text>Obs: segunda-feira não abre</Text>
            </Box>
          </Box>
        </VStack>
      )}
    </>
  );
}
