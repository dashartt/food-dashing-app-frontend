import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAddressesState from "src/store/checkout/useAddresses";
import type { IAddress } from "src/types";
import zod from "zod";

import * as api from "../../services/api";

const addressSchema = zod.object({
  addressName: zod
    .string({
      required_error: "Preeencha o logradouro, exemplo: Rua, Passeio, etc...",
    })
    .min(5, {
      message: "Preeencha o logradouro, exemplo: Rua, Passeio, etc...",
    }),
  addressNumber: zod
    .string({
      required_error: "Preencha o numero da residência",
    })
    .min(1, { message: "Preencha o numero da residência" }),
  complement: zod
    .string()
    // .min(3, {
    //   message: "Digite o complemento completamente, exemplo: apto 29",
    // })
    .optional(),
  districtName: zod
    .string({
      required_error: "Preeencha o nome do bairro, exemplo: Jardim Aeroporto",
    })
    .min(3, {
      message: "Preeencha o nome do bairro, exemplo: Jardim Aeroporto",
    }),
  referencePoint: zod
    .string()
    // .min(5, {
    //   message:
    //     "Digite a referência completamente, exemplo: Perto da Arno Hausser",
    // })
    .optional(),
});

type Props = {
  addressId?: string;
};

export default function AddressForm({ addressId = "" }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { addAddress, setAddress, getAddress, updateAddress } =
    useAddressesState();

  const initialFormValue = getAddress(addressId);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<IAddress>({
    ...(initialFormValue && { values: { ...initialFormValue } }),
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (adressDTO: IAddress) => {
    console.log(adressDTO);
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
          <FormControl isInvalid={!!errors.addressName}>
            <FormLabel htmlFor="addressName">Endereço</FormLabel>
            <Input
              className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
              {...register("addressName")}
              id="addressName"
              placeholder="ex: Rua Araras"
            />

            <FormErrorMessage>{errors.addressName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.addressNumber}>
            <FormLabel htmlFor="addressNumber">Numero da residência</FormLabel>
            <Input
              className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
              {...register("addressNumber")}
              id="addressNumber"
              placeholder="ex: 290"
            />

            <FormErrorMessage>{errors.addressNumber?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.complement}>
            <FormLabel htmlFor="complement">Complemento (opcional)</FormLabel>
            <Input
              className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
              {...register("complement")}
              id="complement"
              placeholder="ex: Apto 2B"
            />

            <FormErrorMessage>{errors.complement?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.districtName}>
            <FormLabel htmlFor="districtName">Bairro</FormLabel>
            <Input
              className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
              {...register("districtName")}
              id="districtName"
              placeholder="ex: Jardim Aeroporto"
            />

            <FormErrorMessage>{errors.districtName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.referencePoint}>
            <FormLabel htmlFor="referencePoint">
              Ponto de referência (opcional)
            </FormLabel>

            <Input
              className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
              {...register("referencePoint", {
                validate: {
                  required: (value) => {
                    if (
                      value.length > 0 &&
                      getValues("referencePoint").length > 0
                    )
                      return true;
                    return false;
                  },
                },
              })}
              id="referencePoint"
              placeholder="ex: Perto de, próximo de, ..."
            />

            <FormErrorMessage>
              {errors.referencePoint?.message}
            </FormErrorMessage>
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
