import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiCloseLine } from "react-icons/ri";

import useAddressesState from "@/store/checkout/useAddresses";
import type { IAddress } from "@/types";
import { StoreCallback } from "@/utils";

type Props = {
  address: IAddress | null;
  canRemove?: boolean;
  asButton?: boolean;
};

export default function AddressCard({
  address,
  asButton = false,
  canRemove = false,
}: Props) {
  const { setAddress } = useAddressesState();

  const onClickCard = () => {
    setAddress(address?._id);
    StoreCallback.fireCallback({
      key: "SelectAddressModal/onClose",
    });
  };
  const buttonProps = asButton && { role: "button", onClick: onClickCard };

  if (!address) return null;
  return (
    <Card
      {...(asButton && buttonProps)}
      className="w-full max-w-xs border border-gray-400 bg-white shadow-lg"
      variant="outline"
    >
      <CardBody>
        <HStack>
          <VStack className="w-full items-start -space-y-1">
            <Text>{`${address?.addressName}, ${address?.addressNumber} ${address?.complement}`}</Text>
            <Text>{address?.districtName}</Text>
            <Text>{address?.referencePoint}</Text>
          </VStack>
          {canRemove && (
            <IconButton
              onClick={() => setAddress()}
              size="sm"
              aria-label="Remover endereço"
              className="self-start rounded-full bg-transparent"
              icon={<RiCloseLine className="text-2xl text-red-500 " />}
            />
          )}
        </HStack>
      </CardBody>
    </Card>
  );
}
