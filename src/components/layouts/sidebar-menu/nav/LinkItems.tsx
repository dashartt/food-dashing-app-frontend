import type { IconType } from "react-icons";
import { BsCardChecklist, BsCart3 } from "react-icons/bs";
import { GiFireBowl } from "react-icons/gi";
import { GoBook } from "react-icons/go";
import { MdManageAccounts, MdOutlineDeliveryDining } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";

interface LinkItemProps {
  path: string;
  name: string;
  icon: IconType;
}
export const ClientLinkItems: Array<LinkItemProps> = [
  {
    name: "Cardápio",
    path: "/",
    icon: GoBook,
  },
  {
    path: "/cart",
    name: "Carrinho",
    icon: BsCart3,
  },
  {
    path: "/history",
    name: "Pedidos",
    icon: RiFileList3Line,
  },
  {
    path: "/identification",
    name: "Conta",
    icon: MdManageAccounts,
  },
];

export const AdminLinkItems: Array<LinkItemProps> = [
  {
    path: "/admin/orders/to-do",
    name: "Pedidos a fazer",
    icon: RiFileList3Line,
  },
  {
    path: "/admin/orders/in-progress",
    name: "Pedidos em andamento",
    icon: RiFileList3Line,
  },
  {
    path: "/admin/oven",
    name: "Forno",
    icon: GiFireBowl,
  },
  {
    path: "/admin/delivery",
    name: "Entregas",
    icon: MdOutlineDeliveryDining,
  },
  {
    path: "/admin/history",
    name: "Histórico",
    icon: BsCardChecklist,
  },
];
