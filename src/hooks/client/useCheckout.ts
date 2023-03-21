import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useAddressesState from "@/store/checkout/useAddresses";
import useDeliveryState from "@/store/checkout/useDelivery";
import usePaymentState from "@/store/checkout/usePayment";
import useScheduleState from "@/store/checkout/useScheduleOrder";
import useShopSettings from "@/store/shop/setup/useShopSetup";
import useSessionState from "@/store/useSession";
import useShoppingCart from "@/store/useShoppingCart";
import type { IOrderItem } from "@/types";

import * as api from "../../services/api";
import * as utils from "../../utils";
import * as geoapify from "../../utils/geoapify.util";
import useShopSegmentURL from "../shared/useShopSegmentURL";

export default function useCheckout() {
  const [mounted, setMounted] = useState(false);
  const toast = useToast();
  const { baseURL, router } = useShopSegmentURL();
  const shopAddress = useShopSettings(
    ({ shopSettings }) => shopSettings?.shopAddress
  );

  const { session } = useSessionState();
  const { address, addresses } = useAddressesState();

  const { needPayback, paymentType, paybackValue } = usePaymentState();
  const { scheduleOption } = useScheduleState();
  const delivery = useDeliveryState();

  const { emptyCart, items, getTotalPrice } = useShoppingCart();

  const onConfirmPurchase = async () => {
    if (
      !address ||
      addresses.length === 0 ||
      (needPayback && paybackValue === 0)
    ) {
      toast({
        title: "Faltam informações",
        description: "Confirme se escolheu o endereço e forma de pagamento",
        ...utils.toastOptions,
      });
    } else {
      await api
        .addOrder({
          clientId: session?._id || "",
          addressId: address?._id || "",
          items: items.map((item_) => ({
            itemIds: item_.item.map((item__) => item__?._id),
            quantity: item_.quantity,
            ...(item_.observation && { observation: item_.observation }),
            // ...(item_.borderType !== "" && { borderType: item_?.borderType }),
            ...(item_.additionals &&
              item_.additionals.length > 0 && {
                additionalIds: item_.additionals.map(
                  (additional) => additional._id
                ),
              }),
          })) as unknown as IOrderItem[],
          paymentType,
          isDelivery: delivery.type === "delivery",
          ...(needPayback && { hasPayBack: needPayback }),
          ...(paybackValue && { payback: paybackValue }),
        })
        .then((orderId) => {
          emptyCart();
          router.push(`${baseURL}/order/${orderId}`);
        })
        .catch(() => {
          throw new Error("erro ao cadastrar pedido");
        });
    }
  };

  useEffect(() => {
    setMounted(true);

    if (items.length === 0) router.push(baseURL);
    if (!session?._id) {
      toast({
        title: "Você ainda não tem uma conta",
        description: "Cadastra-se para continuar e confirmar seu pedido",
        ...utils.toastOptions,
      });
      router.push(`${baseURL}/account`);
    }
  }, []);

  useEffect(() => {
    geoapify
      .calculateDeliveryFee(
        [address?.lon || 0, address?.lat || 0],
        [shopAddress?.lon || 0, shopAddress?.lat || 0]
      )
      .then((price) => {
        delivery.setPrice(price);
      });
  }, [address]);

  return {
    mounted,
    onConfirmPurchase,
    getTotalPrice,
    scheduleOption,
    delivery,
    router,
    address,
    paymentType,
    needPayback,
  };
}
