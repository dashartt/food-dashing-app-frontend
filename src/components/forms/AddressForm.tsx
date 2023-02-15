import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
import AddressFieldTooltip from "../tooltips/AddressFieldTooltip";

const addressSchema = zod.object({
  addressName: zod
    .string({
      required_error: "Preeencha o endereço",
    })
    .min(5, {
      message: "Preeencha o endereço",
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
      required_error: "Preeencha o nome do bairro",
    })
    .min(3, {
      message: "Preeencha o nome do bairro",
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
          className="w-full space-y-6 p-4"
        >
          <FormControl isInvalid={!!errors.addressName}>
            <HStack>
              <FormLabel htmlFor="addressName" className="m-0 p-0">
                Endereço
              </FormLabel>
              <AddressFieldTooltip
                label="este endereço é Rua, Passeio, etc? Informe isso e depois digite o nome do endereço"
                fieldName="endereço"
              />
            </HStack>
            <Input
              className="border border-gray-400 bg-white placeholder:text-gray-600"
              {...register("addressName")}
              id="addressName"
            />

            <FormErrorMessage>{errors.addressName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.addressNumber}>
            <FormLabel htmlFor="addressNumber">Numero da residência</FormLabel>
            <Input
              className="border border-gray-400 bg-white placeholder:text-gray-600"
              {...register("addressNumber")}
              id="addressNumber"
            />

            <FormErrorMessage>{errors.addressNumber?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.complement}>
            <HStack>
              <FormLabel htmlFor="complement" className="m-0 p-0">
                Complemento (opcional)
              </FormLabel>
              <AddressFieldTooltip
                label="em apartamentos e outros tipos de residência existem informações adicionais do número da residência para ser informado"
                fieldName="complemento"
              />
            </HStack>
            <Input
              className="border border-gray-400 bg-white placeholder:text-gray-600"
              {...register("complement")}
              id="complement"
            />

            <FormErrorMessage>{errors.complement?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.districtName}>
            <FormLabel htmlFor="districtName">Bairro</FormLabel>
            <Input
              className="border border-gray-400 bg-white placeholder:text-gray-600"
              {...register("districtName")}
              id="districtName"
            />

            <FormErrorMessage>{errors.districtName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.referencePoint}>
            <HStack>
              <FormLabel htmlFor="referencePoint" className="m-0 p-0">
                Ponto de referência (opcional)
              </FormLabel>
              <AddressFieldTooltip
                label="diga algum lugar de referência para ajudar a localizar onde você está"
                fieldName="ponto de referência"
              />
            </HStack>

            <Input
              className="border border-gray-400 bg-white placeholder:text-gray-600"
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
            />

            <FormErrorMessage>
              {errors.referencePoint?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            className="w-full bg-gray-default py-2 text-center text-white"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      )}
    </>
  );
}
