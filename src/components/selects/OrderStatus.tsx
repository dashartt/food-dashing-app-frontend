import { Select } from "@chakra-ui/react";
import type { ChangeEventHandler } from "react";
import { useEffect, useState } from "react";

import useOrderState from "@/store/useOrder";

import * as api from "../../services/api";

type Props = {
  orderId: string;
  statusProp: string;
  isDelivery: boolean;
};

const optionsMap = [
  {
    value: "to-do",
    text: "A fazer",
  },
  {
    value: "in-progress",
    text: "Montar",
  },
  {
    value: "oven",
    text: "Forno",
  },
  {
    value: "delivery",
    text: "Entrega",
  },
  {
    value: "pick-up",
    text: "Buscar",
  },
  {
    value: "completed",
    text: "Concluido",
  },
];

export default function OrderStatus({
  orderId,
  statusProp,
  isDelivery,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const { updateOrderStatus } = useOrderState();
  const [status, setStatus] = useState(statusProp);

  const options = optionsMap.filter(({ value }) =>
    isDelivery ? value !== "pick-up" : value !== "delivery"
  );
  const handlerStatus: ChangeEventHandler<HTMLSelectElement> = async ({
    target,
  }) => {
    setStatus(target.value);
    updateOrderStatus(orderId, target.value);

    api.updateOrderStatus(orderId, target.value).catch((_error) => {
      throw new Error("erro ao atualizar o status do pedido");
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Select
          onChange={handlerStatus}
          className="border border-gray-400"
          value={status}
          role="button"
        >
          <option value="" className="hidden">
            Status
          </option>
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </Select>
      )}
    </>
  );
}
