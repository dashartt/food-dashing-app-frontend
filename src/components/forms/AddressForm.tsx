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

export default function AddressForm() {
  const [mounted, setMounted] = useState(false);

  const { handleSubmit, register } = useForm<IAddress>();

  const { addAddress, setAddress } = useAddressesState();
  const router = useRouter();

  const onSubmit = async (values: IAddress) => {
    api
      .addAddress({
        ...values,
      })
      .then((addressId) => {
        addAddress({
          _id: addressId || "",
          ...values,
        });
        setAddress(addressId || "");

        router.back();
      })
      .catch((_error) => {
        throw new Error("erro ao cadastrar endereço");
      });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
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
