"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import useShopSettings from "@/store/shop/setup/useShopSetup";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  const name = useShopSettings((state) => state.shopSettings?.shopName);
  const address = useShopSettings((state) => state.shopSettings?.shopAddress);
  const serviceTime = useShopSettings(
    (state) => state.shopSettings?.shopOpeningHours
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <VStack className="items-start md:w-96">
          <Heading className="m-4 w-full text-3xl">{name}</Heading>

          <Box className="w-full space-y-2 p-4">
            <Text className="text-md text-xl font-semibold">Endereço</Text>
            <VStack className="items-start space-y-4 rounded-md border border-gray-400 p-4 shadow-lg">
              <VStack className="items-start space-y-0">
                <Text>
                  {`${address?.street}, ${address?.housenumber} ${
                    address?.complement || ""
                  }`}
                </Text>
                <Text>{`${address?.suburb}`}</Text>
                <Text>{`${address?.city} - ${address?.state_code}`}</Text>
                <Text>{address?.referencePoint || ""}</Text>
              </VStack>

              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={`https://maps.google.com/?q=${address?.lat},${address?.lon}`}
                className="font-semibold text-blue-700 underline underline-offset-2"
              >
                Visualizar localização aproximada
              </Link>
            </VStack>
          </Box>

          <Box className="w-full space-y-2 p-4">
            <Text className="text-md text-xl font-semibold">
              Formas de pagamento
            </Text>
            <VStack className="w-full items-start space-y-0 rounded-md border border-gray-400 p-4 shadow-lg">
              <Text>Cartões: crédito e débito</Text>
              <Text>Pix: (18) 98137-1989</Text>
              <Text>Dinheiro</Text>
            </VStack>
          </Box>

          <Box className="w-full space-y-2 p-4">
            <Text className="text-md text-xl font-semibold">
              Horário de atendimento
            </Text>
            <Box className="space-y-4 rounded-md border border-gray-400 p-4 shadow-lg">
              <Text>
                {serviceTime?.daysOfWeek
                  .map((dayWeek) => dayWeek.label)
                  .join(", ")}
              </Text>
              <Text>
                Inicia em {serviceTime?.hours.starts}h e vai até{" "}
                {serviceTime?.hours.ends}h
              </Text>
            </Box>
          </Box>
        </VStack>
      )}
    </>
  );
}
