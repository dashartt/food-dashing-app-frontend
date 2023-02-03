import moment from "moment";

export const setHeaderTitle = (path: string) => {
  const pathAndTitle = [
    {
      path: "/admin/orders/to-do/",
      title: "Pedidos a fazer",
    },
    {
      path: "/admin/orders/in-progress/",
      title: "Pedidos em andamento",
    },
    {
      path: "/admin/delivery/",
      title: "Entregas",
    },
    {
      path: "/admin/oven/",
      title: "Forno",
    },
    {
      path: "/admin/history/",
      title: "Histórico",
    },
    {
      path: "/pizzaria-information",
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
  return pathAndTitle.find((obj) => path.includes(obj.path))?.title;
};

export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

export const formatDate = (value: string) => moment(value).format("DD/MM/YY");
