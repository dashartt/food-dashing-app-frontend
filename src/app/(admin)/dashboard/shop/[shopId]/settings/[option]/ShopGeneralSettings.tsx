"use client";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
// import { City, State } from "country-state-city";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import ServiceDaysCheckbox from "@/components/inputs/checkbox/ServiceDaysInput";
// import SearchPlaceInput from "@/components/inputs/SearchPlaceInput";
import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import * as API from "@/services/API/shop.service";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import type { IDeliveryFeeByDistance, IShopSettings } from "@/types/shop.type";
import { formatCurrency } from "@/utils/format.util";

export default function ShopGeneralSettings() {
  const toast = useToast();
  const { shopId } = useShopSegmentURL();
  const state = useShopSettings();

  const deliveryFeeForm = useForm<IDeliveryFeeByDistance>();
  const methodsForm = useForm<IShopSettings>({
    defaultValues: { ...state.shopSettings },
  });

  const onRemoveDeliveryFee = ({ upToKm, price }: IDeliveryFeeByDistance) => {
    const deliveryFees = methodsForm.getValues().deliveryFees || [];

    const payload = deliveryFees?.filter(
      (deliveryFee) =>
        deliveryFee.price !== price && deliveryFee.upToKm !== upToKm
    );

    methodsForm.setValue("deliveryFees", payload);
  };

  const onAddDeliveryFee = () => {
    const { deliveryFees = [] } = methodsForm.getValues();
    const { price, upToKm } = deliveryFeeForm.getValues();

    const payload = [...deliveryFees, { price, upToKm }];

    methodsForm.setValue("deliveryFees", payload);
    deliveryFeeForm.reset();
  };

  const onSubmitSettings = () => {
    API.saveShopSettings(shopId, methodsForm.getValues()).then((response) => {
      toast({
        title: response.message,
        position: "top",
      });

      if (response.message.includes("registradas") && response.data) {
        state.setShopSettings(response.data);
      }
    });
  };

  return (
    <VStack className=" items-start space-y-6">
      <Box className="space-y-6 rounded-md border border-gray-400 p-4">
        <Text className="text-center text-xl">Informações de atendimento</Text>
        <VStack className="items-start">
          <Text>Dias da semana</Text>
          <ServiceDaysCheckbox
            defaultValues={
              state.shopSettings?.shopOpeningHours?.daysOfWeek?.map(
                (value) => value.label
              ) || [""]
            }
            onChange={(values) =>
              methodsForm.setValue("shopOpeningHours.daysOfWeek", values)
            }
          />
        </VStack>

        <HStack className="space-x-4">
          <FormControl className="w-fit">
            <FormLabel htmlFor="starts">Começa em</FormLabel>
            <Input
              {...methodsForm.register("shopOpeningHours.hours.starts")}
              defaultValue={state.shopSettings?.shopOpeningHours?.hours?.starts}
              type="number"
              className="w-20 border border-gray-400 text-center"
              id="starts"
            />
          </FormControl>
          <FormControl className="w-fit ">
            <FormLabel htmlFor="ends">Termina em</FormLabel>
            <Input
              {...methodsForm.register("shopOpeningHours.hours.ends")}
              defaultValue={state.shopSettings?.shopOpeningHours?.hours?.ends}
              type="number"
              className="w-20 border border-gray-400 text-center"
              id="ends"
            />
          </FormControl>
        </HStack>
      </Box>

      <Box className="w-full items-start space-y-6 rounded-md border border-gray-400 p-4">
        <Text className="text-center text-xl">Taxas de entrega</Text>
        <Box className="max-w-xs space-y-10 mx-auto">
          {methodsForm.watch("deliveryFees")?.length === 0 && (
            <Alert status="warning" className="rounded-md">
              <AlertIcon className="self-start" />
              Se não tiver variação de taxa, adicione o valor padrão. Se tiver,
              informe o menor valor da taxa
            </Alert>
          )}

          <form className="w-full flex justify-between space-x-2">
            <FormControl className="flex flex-col items-start">
              <FormLabel htmlFor="upToKmDistance" className="w-full">
                Acima de (km)
              </FormLabel>
              <Input
                id="upToKmDistance"
                {...deliveryFeeForm.register("upToKm", { valueAsNumber: true })}
                type="number"
                {...(methodsForm.watch("deliveryFees").length === 0 && {
                  disabled: true,
                })}
                step={0.1}
                className="w-24 border border-gray-400"
              />
            </FormControl>

            <FormControl className="flex flex-col items-start">
              <FormLabel htmlFor="deliveryFee">Valor</FormLabel>
              <Input
                id="deliveryFee"
                {...deliveryFeeForm.register("price", { valueAsNumber: true })}
                type="number"
                className="w-24 border border-gray-400"
              />
            </FormControl>

            <IconButton
              onClick={onAddDeliveryFee}
              aria-label="Adicionar taxa de entrega por km de distância"
              className="m-0 self-end bg-blue-500 p-0 text-2xl hover:bg-blue-300 active:bg-blue-300"
              icon={<AiOutlinePlus className="text-white" />}
            />
          </form>

          <VStack className="items-start space-y-2">
            {methodsForm.watch("deliveryFees")?.map(({ upToKm, price }) => (
              <Card
                key={`${upToKm}-${price}`}
                className="w-full min-w-[15rem] border border-gray-400"
                variant="outline"
              >
                <CardBody className="relative flex flex-col items-start">
                  <Text>Acima de {upToKm || 0} Km</Text>
                  <Text>{`R$ ${formatCurrency(price)}`}</Text>

                  <IconButton
                    className="absolute top-2 right-2 bg-white hover:bg-gray-300 active:bg-gray-300"
                    onClick={() => onRemoveDeliveryFee({ price, upToKm })}
                    aria-label="Excluir taxa de entrega"
                    icon={<MdClose className="text-xl" />}
                  />
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Box>
      </Box>

      <Button
        onClick={onSubmitSettings}
        className="w-32 self-end bg-blue-500 text-white hover:bg-blue-300 active:bg-blue-300"
      >
        Confirmar
      </Button>
    </VStack>
  );
}
