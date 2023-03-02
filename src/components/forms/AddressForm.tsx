import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";

import useAddressForm from "../../hooks/client/useAddressForm";
import AddressFieldTooltip from "../tooltips/AddressFieldTooltip";

type Props = {
  addressId?: string;
};

export default function AddressForm({ addressId = "" }: Props) {
  const { onSubmit, handleSubmit, errors, getValues, register } =
    useAddressForm({ addressId });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
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
                if (value.length > 0 && getValues("referencePoint").length > 0)
                  return true;
                return false;
              },
            },
          })}
          id="referencePoint"
        />

        <FormErrorMessage>{errors.referencePoint?.message}</FormErrorMessage>
      </FormControl>

      <Button
        className="w-full bg-gray-default py-2 text-center text-white"
        type="submit"
      >
        Salvar
      </Button>
    </form>
  );
}
