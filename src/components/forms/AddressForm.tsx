import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
              className="rounded-none bg-gray-200 placeholder:text-gray-600"
              {...register("addressName")}
              id="addressName"
              placeholder="Rua Araras, Passeio Maringá, etc"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="addressNumber">Numero da residência</FormLabel>
            <Input
              className="rounded-none bg-gray-200 placeholder:text-gray-600"
              {...register("addressNumber")}
              id="addressNumber"
              placeholder="290"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="complement">Complemento (opcional)</FormLabel>
            <Input
              className="rounded-none bg-gray-200 placeholder:text-gray-600"
              {...register("complement")}
              id="complement"
              placeholder="Sala A, Apto 2B"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="districtName">Bairro</FormLabel>
            <Input
              className="rounded-none bg-gray-200 placeholder:text-gray-600"
              {...register("districtName")}
              id="districtName"
              placeholder="..."
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="referencePoint">
              Ponto de referência (opcional)
            </FormLabel>
            <Input
              className="rounded-none bg-gray-200 placeholder:text-gray-600"
              {...register("referencePoint")}
              id="referencePoint"
              placeholder="perto de, próximo de, etc"
            />
          </FormControl>

          <Button
            className="w-full rounded-none bg-[#1a95f3] py-2 text-center text-white"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      )}
    </>
  );
}
