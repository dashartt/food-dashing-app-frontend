import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
// import Link from "next/link";
// import { BiEditAlt } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";

import useAddressesState from "@/store/checkout/useAddresses";
import useSessionState from "@/store/useSession";
import type { IAddress } from "@/types/address.type";

import * as api from "../../services/api";

type Props = {
  address: IAddress | null;
  canRemove?: boolean;
  asButton?: boolean;
  canDeleteAndUpdate?: boolean;
};

export default function AddressCard({
  address,
  asButton = false,
  canRemove = false,
  canDeleteAndUpdate = false,
}: Props) {
  const { setAddress, removeAddress } = useAddressesState();
  const { session } = useSessionState();

  const onRemoveAddress = async (_id_: string) => {
    removeAddress(_id_);
    await api.removeAddress(_id_);
  };

  const onClickAddressCard = () => {
    setAddress(address?._id || "");
  };

  const buttonProps = asButton && {
    role: "button",
    onClick: onClickAddressCard,
  };

  if (!address) return null;
  return (
    <Card
      {...(asButton && buttonProps)}
      className="w-full max-w-sm border border-gray-400 bg-white shadow-lg"
      variant="outline"
    >
      <CardBody>
        <HStack key={address?._id} className="justify-between">
          <VStack className="w-full items-start -space-y-1">
            <Text>{`${address?.street}, ${address?.housenumber || ""} ${
              address?.complement || ""
            }`}</Text>
            <Text>{address?.suburb}</Text>
            <Text>{address?.referencePoint}</Text>
          </VStack>
          {session?._id && canDeleteAndUpdate && (
            <HStack className="space-x-2 items-start">
              {/* <Link
                className="rounded-md border border-gray-300 bg-transparent p-[0.55rem]"
                href={{
                  pathname: "/address",
                  query: { addressId: address._id },
                }}
              >
                <BiEditAlt className="text-xl" />
              </Link> */}
              <IconButton
                className="border border-gray-300 bg-transparent"
                aria-label="Excluir endereço"
                onClick={() => onRemoveAddress(address._id || "")}
                icon={<RiCloseLine className="text-xl" />}
              />
            </HStack>
          )}
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
