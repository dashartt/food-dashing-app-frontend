import type { ToastPosition } from "@chakra-ui/react";
import moment from "moment";

const StringMask = require("string-mask");

// Session title chosen based on path  -------------------->
export const setHeaderTitle = (path_: string) => {
  const adminPathsAndTiles = [
    {
      path: "/orders/to-do/",
      title: "Pedidos a fazer",
    },
    {
      path: "/orders/in-progress/",
      title: "Pedidos em andamento",
    },
    {
      path: "/orders/delivery/",
      title: "Pedidos para entregas",
    },
    {
      path: "/orders/pick-up/",
      title: "Pedidos para retirar no local",
    },
    {
      path: "/orders/oven/",
      title: "Pedidos no forno",
    },
    {
      path: "/orders/completed/",
      title: "Histórico de pedidos",
    },
    {
      path: "/settings/general",
      title: "Informações gerais",
    },
    {
      path: "/settings/categories",
      title: "Categorias",
    },
    {
      path: "/settings/additional",
      title: "Adicionais",
    },
    {
      path: "/settings/items",
      title: "Produtos do cardápio",
    },
  ];
  const clientPathsAndTitles = [
    {
      path: "/about",
      title: "Sobre o estabelecimento",
    },
    {
      path: "/order/",
      title: "Detalhes do pedido",
    },
    {
      path: "/menu/",
      title: "Detalhes do pedido",
    },
    {
      path: "/account",
      title: "Informações da conta",
    },
    {
      path: "/history",
      title: "Histórico de pedidos",
    },
    {
      path: "/checkout",
      title: "Finalizar pedido",
    },
    {
      path: "/cart",
      title: "Carrinho de compras",
    },
    {
      path: "/address",
      title: "Endereço",
    },
    {
      path: "/",
      title: "Cardápio",
    },
  ];
  return (
    [...adminPathsAndTiles, ...clientPathsAndTitles].find(({ path }) =>
      path_.includes(path)
    )?.title || ""
  );
};

// Format currency  -------------------->
export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

// Format date  -------------------->
export const formatDate = (value: string) => moment(value).format("DD/MM/YY");

// Format phone -------------------->
export const formatterPhone = new StringMask("(00) 00000-0000");
export const formatPhone = (value: string) => formatterPhone.apply(value);

// Toast default options  -------------------->
export const toastOptions = {
  variant: "solid",
  isClosable: true,
  position: "top" as ToastPosition,
};

// Get category name based on value in database -------------------->
export const getCategoryName = (inputProp: string = "") => {
  type CategoryNameMap = {
    input: string; // name in the database
    output: string; // name to show
  };
  const categoryNameMap: CategoryNameMap[] = [
    {
      input: "salty pizza",
      output: "Pizza salgada",
    },
    {
      input: "sweet pizza",
      output: "Pizza doce",
    },
    {
      input: "arabic snack",
      output: "Lanche árabe",
    },
    {
      input: "drinks",
      output: "Bebida",
    },
  ];

  return categoryNameMap.find(({ input }) => input === inputProp)?.output || "";
};

type IStoreCallback = {
  key: string;
  callback: Function;
};

export class StoreCallback {
  static callbacks: IStoreCallback[] = [];

  static setCallback({ key, callback }: { key: string; callback: Function }) {
    StoreCallback.callbacks.push({
      key,
      callback,
    });
  }

  static fireCallback({ key }: { key: string }) {
    StoreCallback.callbacks.find((item) => item.key === key)?.callback();
  }
}
