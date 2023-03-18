"use client";

import {
  Box,
  Card,
  CardBody,
  Container,
  HStack,
  Icon,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

import AddShopDrawner from "@/components/modals/AddShopDrawner";
import { getShopsByOwnerId } from "@/services/API/shop.service";
import useSessionState from "@/store/useSession";

export default function LadingPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { session } = useSessionState();

  const { data: shops, refetch } = useQuery({
    queryKey: [`food-dashing-app/${session?._id}/dashboard/`],
    queryFn: () => getShopsByOwnerId(session?._id || ""),
    enabled: false,
  });

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
                  <AddShopDrawner />
                </HStack>

                {shops?.data && shops.data.length > 0 ? (
                  <Wrap>
                    {shops.data.map((shop) => (
                      <Card
                        key={shop._id}
                        variant="outline"
                        role="button"
                        onClick={() =>
                          router.push(`/dashboard/shop/${shop._id}`)
                        }
                      >
                        <CardBody>
                          <HStack className="space-x-6">
                            <VStack className="items-start">
                              <Text>{shop.shopName}</Text>
                              <Text>
                                {`${shop.shopAddress?.city} -
                              ${shop.shopAddress?.state_code}`}
                              </Text>
                            </VStack>
                            <Icon as={MdArrowForwardIos} />
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Wrap>
                ) : (
                  <Text>Nenhuma loja cadastrada no momento</Text>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}
