import { Card, CardBody, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import type { IShopSettings } from "@/types/shop.type";

type Props = {
  shop: IShopSettings;
  key: string;
};

export default function ShopCard({ shop, key }: Props) {
  const { router } = useShopSegmentURL();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <>
      {mounted && (
        <Card
          key={key}
          variant="outline"
          role="button"
          className="w-full max-w-xs bg-white"
          onClick={() => {
            router.push(`/shop/${shop._id}`);
          }}
        >
          <CardBody>
            <HStack className="justify-between space-x-6">
              <VStack className="items-start">
                <Text>{shop.shopName}</Text>
                <Text>
                  {`${shop.shopAddress?.city} - ${shop.shopAddress?.state_code}`}
                </Text>
              </VStack>
              <Icon as={MdArrowForwardIos} />
            </HStack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
