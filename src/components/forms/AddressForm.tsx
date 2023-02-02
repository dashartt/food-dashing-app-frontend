import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAddressesState from "src/store/checkout/useAddresses";
import type { IAddress } from "src/types";

import * as api from "../../services/api";

type Props = {
  addressId?: string;
};

export default function AddressForm({ addressId = "" }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { addAddress, setAddress, getAddress, updateAddress } =
    useAddressesState();

  const initialAddress = getAddress(addressId);
  const { handleSubmit, register } = useForm<IAddress>({
    ...(initialAddress && { values: { ...initialAddress } }),
  });

  const onSubmit = async (adressDTO: IAddress) => {
    if (addressId !== "") {
      api
        .updateAddress(addressId, {
          ...adressDTO,
        })
        .then(() => {
          updateAddress(addressId, adressDTO);
          setAddress(addressId);
          router.back();
        })
        .catch((_error) => {
          throw new Error("erro ao atualizar endereço");
        });
    } else {
      api
        .addAddress({
          ...adressDTO,
        })
        .then((addressId_) => {
          addAddress({
            _id: addressId_ || "",
            ...adressDTO,
          });
          setAddress(addressId_ || "");

          router.back();
        })
        .catch((_error) => {
          throw new Error("erro ao cadastrar endereço");
        });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 p-4"
        >
          <FormControl className="-space-y-2">
            <FormLabel htmlFor="addressName">Logradouro</FormLabel>
            <Input
              className="bg-gray-100 placeholder:text-gray-600 border border-gray-400"
              {...register("addressName")}
              id="addressName"
              placeholder="ex: Rua Araras"
            />
          </FormControl>

          <HStack>
            <FormControl className="-space-y-2">
              <FormLabel htmlFor="addressNumber">
                Numero da residência
              </FormLabel>
              <Input
                className="bg-gray-100 placeholder:text-gray-600 border border-gray-400"
                {...register("addressNumber")}
                id="addressNumber"
                placeholder="ex: 290"
              />
            </FormControl>

            <FormControl className="-space-y-2">
              <FormLabel htmlFor="complement">Complemento (opcional)</FormLabel>
              <Input
                className="bg-gray-100 placeholder:text-gray-600 border border-gray-400"
                {...register("complement")}
                id="complement"
                placeholder="ex: Apto 2B"
              />
            </FormControl>
          </HStack>
          <FormControl className="-space-y-2">
            <FormLabel htmlFor="districtName">Bairro</FormLabel>
            <Input
              className="bg-gray-100 placeholder:text-gray-600 border border-gray-400"
              {...register("districtName")}
              id="districtName"
              placeholder="ex: Jardim Aeroporto"
            />
          </FormControl>

          <FormControl className="-space-y-2">
            <FormLabel htmlFor="referencePoint">
              Ponto de referência (opcional)
            </FormLabel>

            <Input
              className="bg-gray-100 placeholder:text-gray-600 border border-gray-400"
              {...register("referencePoint")}
              id="referencePoint"
              placeholder="ex: Perto de, próximo de, ..."
            />
          </FormControl>

          <Button
            className="w-full bg-[#1195f3] py-2 text-center text-white"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      )}
    </>
  );
}
