import { Select } from "@chakra-ui/react";
import type { ChangeEventHandler } from "react";
import { useEffect, useState } from "react";

import useOrderState from "@/store/useOrder";

import * as api from "../../services/api";

type Props = {
  orderId: string;
  statusProp: string;
};

export default function OrderStatus({ orderId, statusProp }: Props) {
  const [mounted, setMounted] = useState(false);
  const { updateOrderStatus } = useOrderState();
  const [status, setStatus] = useState(statusProp);

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
      {" "}
      {mounted && (
        <Select
          onChange={handlerStatus}
          className="border border-gray-400"
          value={status}
        >
          <option value="" className="hidden">
            Status
          </option>
          <option value="to-do">A fazer</option>
          <option value="in-progress">Montando</option>
          <option value="oven">Forno</option>
          <option value="delivery">Entrega</option>
          <option value="completed">Concluido</option>
        </Select>
      )}
    </>
  );
}
