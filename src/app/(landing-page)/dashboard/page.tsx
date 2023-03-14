"use client";

import {
  Box,
  Card,
  CardBody,
  Container,
  HStack,
  IconButton,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsPlusSquare } from "react-icons/bs";

import ShopInfoStep from "@/components/stepper/shop-setup/steps/ShopInfoStep";
import useSessionState from "@/store/useSession";
import type { IShopSettings } from "@/types/shop/settings.type";

import { addShop, getShops } from "../../../services/API/shop.service";
import AddShop from "@/components/pages/admin/dashboard/AddShop";

export default function LadingPage() {
  const [mounted, setMounted] = useState(false);
  const { session } = useSessionState();

  const { data: shops, refetch } = useQuery({
    queryKey: [`food-dashing-app/${session?._id}/dashboard/`],
    queryFn: () => getShops(session?._id || ""),
    enabled: false,
  });

  const onConfirmShopPerfil = (values: IShopSettings) => {
    addShop({
      ...values,
      owner: { _id: session?._id },
    })
      .then((response) => {
        toast.success(response.message);

        if (response.data) {
          //
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Algum erro inesperado aconteceu");
      });
  };

  useEffect(() => {
    setMounted(true);
    refetch();
  }, []);

  return (
    <>
      {mounted && (
        <Box className="max-h-screen min-h-screen overflow-auto scroll-smooth bg-gradient-to-r from-green-400 to-blue-500 py-20">
          <Container className="space-y-10 sm:min-w-[60vw]">
            <Box className="rounded-md bg-white p-10">
              <Text className="mb-10">Olá, {session?.fullName}!</Text>

              <Box className="space-y-2">
                {/* <HStack> */}
                <HStack>
                  <Text className="text-4xl">Lojas</Text>

                  <IconButton
                    aria-label="Cadastrar loja"
                    className="bg-white"
                    icon={<BsPlusSquare className="text-3xl" />}
                  />
                </HStack>

                {shops?.data && shops.data.length > 0 ? (
                  <Wrap>
                    {shops.data.map((shop) => (
                      <Card key={shop._id}>
                        <CardBody>
                          <VStack>
                            <Text>{shop.shopName}</Text>
                            <Text>
                              {shop.shopAddress.city} -{" "}
                              {shop.shopAddress.state_code}
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Wrap>
                ) : (
                  <Text>Nenhuma loja cadastrada no momento</Text>
                )}
              </Box>
            </Box>

            <AddShop />
          </Container>
        </Box>
      )}
    </>
  );
}
