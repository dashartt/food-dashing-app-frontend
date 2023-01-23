"use client";

import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
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
        <VStack className="items-start">
          <HStack className="w-full border-b-2 border-gray-300 p-1">
            <BackPageBtn />
            <Text className="text-lg">Sobre o estabelecimento</Text>
          </HStack>

          <Heading className="p-4 text-2xl">Pizzaria Macaco Louco</Heading>

          <Box>
            <Text className="text-md bg-[#ebebeb] p-4 font-semibold">
              Endereço
            </Text>
            <Link
              href="https://goo.gl/maps/pwPAsAXuVGV4AzBp6"
              className="flex items-center justify-between p-4"
            >
              <Text className="text-gray-700">
                Rua O, 140 - Novo Horizonte, Ilha Solteira - SP, 15385-000,
                Brasil
              </Text>
              <RiArrowRightSLine className="text-5xl text-gray-700" />
            </Link>
          </Box>

          <Box className="w-full">
            <Text className="text-md bg-[#ebebeb] p-4 font-semibold">
              Formas de pagamento
            </Text>
            <VStack className="items-start p-4">
              <Text>Cartões: cŕedito e débito</Text>
              <Text>Pix: chave (18) 98137-1989</Text>
              <Text>Dinheiro</Text>
            </VStack>
          </Box>

          <Box className="w-full">
            <Text className="text-md bg-[#ebebeb] p-4 font-semibold">
              Horário de atendimento
            </Text>
            <Box className="p-4">
              <Text className="mb-2">Das 18h30 às 23h00, nos dias abaixo:</Text>
              <VStack className=" items-start space-y-0">
                <Text>Domingo</Text>
                <Text>Terça-feira</Text>
                <Text>Quarta-feira</Text>
                <Text>Quinta-feira</Text>
                <Text>Sexta-feira</Text>
                <Text>Sábado</Text>
              </VStack>
            </Box>
          </Box>
        </VStack>
      )}
    </>
  );
}
