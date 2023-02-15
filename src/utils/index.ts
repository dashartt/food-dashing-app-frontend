import type { ToastPosition } from "@chakra-ui/react";
import moment from "moment";

import type { ICartItem } from "@/types";

const StringMask = require("string-mask");

// Session title chosen based on path  -------------------->
export const setHeaderTitle = (path_: string) => {
  const adminPathsAndTiles = [
    {
      path: "/admin/orders/to-do/",
      title: "Pedidos a fazer",
    },
    {
      path: "/admin/orders/in-progress/",
      title: "Pedidos em andamento",
    },
    {
      path: "/admin/orders/delivery/",
      title: "Pedidos para entregas",
    },
    {
      path: "/admin/orders/pick-up/",
      title: "Pedidos para retirar no local",
    },
    {
      path: "/admin/orders/oven/",
      title: "Pedidos no forno",
    },
    {
      path: "/admin/orders/completed/",
      title: "Histórico de pedidos",
    },
  ];
  const clientPathsAndTitles = [
    {
      path: "/about",
      title: "Sobre a Pizzaria",
    },
    {
      path: "/order/",
      title: "Detalhes do pedido",
    },
    {
      path: "/menu/",
      title: "Detalhes do produto",
    },
    {
      path: "/identification",
      title: "Perfil",
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
      title: "Carrinho",
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

// method to handle items in shopping cart storage ----------->
export const getShoppingCartStorage = () => {
  const storage = JSON.parse(
    localStorage.getItem("shopping-cart-storage") || "[]"
  ) as { state: { items: ICartItem[] }; version: number };
  return storage.state.items;
};
export const setShoppingCartStorage = (items: ICartItem[]) => {
  localStorage.setItem(
    "shopping-cart-storage",
    JSON.stringify({
      state: {
        items,
      },
      version: 0,
    })
  );
};
export const getItemById = (_id: string) => {
  const items = getShoppingCartStorage();
  return items.find((item) => item._id === _id) || null;
};
export const getItemPrice = (_id: string) => {
  const item = getItemById(_id);
  return item?.item[0]?.price;
};

export const getTotalItemPrice = (_id: string) => {
  const item = getItemById(_id);
  return (item?.quantity || 1) * (item?.item[0]?.price || 1);
};

export const getTotalPrice = () => {
  const items = getShoppingCartStorage();
  return items.reduce((_acc, value) => {
    return _acc + (value.item[0]?.price || 1) * (value.quantity || 1);
  }, 0) as number;
};
