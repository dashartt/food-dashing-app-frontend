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
  ];
  return pathAndTitle.find((obj) => obj.path === path)?.title;
};

export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });
