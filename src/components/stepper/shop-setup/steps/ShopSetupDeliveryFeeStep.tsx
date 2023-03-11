import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { v4 as uuid } from "uuid";

import useDeliveryFees from "@/store/shop/setup/useDeliveryFees";
import type { IDeliveryFeeByDistance } from "@/types/shop/settings";
import { formatCurrency } from "@/utils/format.util";

export default function ShopSetupDeliveryFeeStep() {
  const { register, handleSubmit } = useForm<IDeliveryFeeByDistance>();
  const { deliveryFees, setDeliveryFee } = useDeliveryFees();

  const onRemoveDeliveryFee = ({ upToKm, price }: IDeliveryFeeByDistance) => {
    setDeliveryFee(
      deliveryFees.filter(
        (deliveryFee) =>
          deliveryFee.price !== price && deliveryFee.upToKm !== upToKm
      )
    );
  };

  const onSubmit = (values: IDeliveryFeeByDistance) => {
    setDeliveryFee([...deliveryFees, values]);
  };

  return (
    <VStack className="items-start space-y-6">
      <form className="flex w-fit space-x-2" onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="flex flex-col items-start">
          <FormLabel htmlFor="upToKmDistance" className="w-full">
            Acima de (km)
          </FormLabel>
          <Input
            id="upToKmDistance"
            type="number"
            step={0.1}
            {...register("upToKm")}
            className="w-24 border border-gray-400"
          />
        </FormControl>

        <FormControl className="flex flex-col items-start">
          <FormLabel htmlFor="deliveryFee">Valor</FormLabel>
          <Input
            id="deliveryFee"
            type="number"
            {...register("price")}
            className="w-24 border border-gray-400"
          />
        </FormControl>

        <IconButton
          type="submit"
          aria-label="Adicionar taxa de entrega por km de distância"
          className="m-0 self-end bg-blue-500 p-0 text-2xl hover:bg-blue-500 active:bg-blue-500"
          icon={<AiOutlinePlus className="text-white" />}
        />
      </form>

      <Accordion allowToggle>
        <AccordionItem className="border border-gray-400 rounded-md">
          <AccordionButton>
            <Text>Taxas registradas</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack className="space-y-6">
              {deliveryFees.length > 0 ? (
                deliveryFees.map(({ upToKm, price }) => (
                  <Card
                    key={uuid()}
                    className="w-full min-w-[15rem]"
                    variant="outline"
                  >
                    <CardBody className="relative flex flex-col items-start">
                      <Text>Acima de {upToKm}Km</Text>
                      <Text>{`R$ ${formatCurrency(price)}`}</Text>

                      <IconButton
                        className="bg-white hover:bg-white active:bg-white absolute top-0 right-0"
                        onClick={() => onRemoveDeliveryFee({ price, upToKm })}
                        aria-label="Excluir taxa de entrega"
                        icon={<MdClose />}
                      />
                    </CardBody>
                  </Card>
                ))
              ) : (
                <Text>Nenhuma taxa registrada</Text>
              )}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}
