import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import zod from "zod";

import useAddressesState from "@/store/checkout/useAddresses";
import type { IAddress } from "@/types";

import * as api from "../../services/api";

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

export default function useAddressForm({ addressId = "" }: Props) {
  const router = useRouter();
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

  return {
    getValues,
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
