import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type { FormEventHandler } from "react";
import { useEffect, useRef, useState } from "react";
import ReactInputMask from "react-input-mask";

import useShoppingCart from "@/store/useShoppingCart";

import * as api from "../../services/api";

export default function PaymentModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getTotalPrice, items } = useShoppingCart();
  const emailRef = useRef<HTMLInputElement>(null);
  const cpfRef = useRef<HTMLInputElement>(null);

  const [responsePayment, setResponsePayment] = useState(false);

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const details = {
      transaction_amount: getTotalPrice(),
      additional_info: {
        items: items.map((item) => ({
          id: item._id,
          title: item.item[0]?.name, // refactor to half pizza
          quantity: item.quantity,
          unit_price: item.item[0]?.price,
        })),
      },
      description: "Pagamento do pedido no Macaco Louco Pizzaria",
      payment_method_id: "pix",
      payer: {
        email: emailRef.current?.value || "",
        first_name: "Ronaldo",
        last_name: "Queiroz Lima",
        identification: {
          type: "CPF",
          number: cpfRef.current?.value.replace(/[.|-]/, ""),
        },
      },
      notification_url: "https://eorpjcvcjvhqnq6.m.pipedream.net",
    };

    api
      .makePayment(details)
      .then((response) => {
        console.log(response);
        setResponsePayment(response);
        window.open(
          response.point_of_interaction.transaction_data.ticket_url || "",
          "_blank"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusPayment = () => {
    // api.get(`v1/payments/${responsePayment.data.id}`).then((response) => {
    //   if (response.data.status === "approved") {
    //   }
    // });
  };

  useEffect(() => {
    if (!isOpen) onOpen();
  }, []);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="">Pagamento em PIX</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack className="p-10">
            <form onSubmit={onSubmit} className="space-y-4">
              <FormControl>
                <FormLabel htmlFor="pix-email">Informe seu email</FormLabel>
                <Input
                  ref={emailRef}
                  className="border border-gray-400 shadow-lg"
                  id="pix-email"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="pix-key">Informe seu CPF</FormLabel>
                <Input
                  ref={cpfRef}
                  as={ReactInputMask}
                  mask="999.999.999-99"
                  className="border border-gray-400 shadow-lg"
                  id="pix-key"
                />
              </FormControl>
              <Button
                type="submit"
                className="mt-4 w-full self-end bg-gray-default text-white"
              >
                Confirmar
              </Button>
            </form>
          </VStack>
          {responsePayment && (
            <button onClick={getStatusPayment}>
              Verificar status pagamento
            </button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
