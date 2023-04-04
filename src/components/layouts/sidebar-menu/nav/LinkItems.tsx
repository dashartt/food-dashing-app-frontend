import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";

// import NavItem from "./NavItem";

type IShopNavCommomProps = {
  path?: string;
  label: string;
  value: string;
};
type IShopNavItem = IShopNavCommomProps & {
  items?: IShopNavCommomProps[];
};

export const ShopNavItems: IShopNavItem[] = [
  {
    label: "Sobre a loja",
    value: "about",
    path: "/shop/[shopId]/about",
  },
  {
    label: "Cardápio",
    value: "menu",
    path: "/shop/[shopId]/",
  },
  {
    label: "Carrinho",
    value: "cart",
    path: "/shop/[shopId]/cart",
  },
  {
    label: "Pedidos",
    value: "orders",
    path: "/shop/[shopId]/history",
  },
  {
    label: "Conta",
    value: "account",
    path: "/shop/[shopId]/account",
  },
];

export const ShopAdminNavItems: IShopNavItem[] = [
  {
    label: "Pedidos",
    value: "orders",
    items: [
      {
        path: "/dashboard/shop/[shopId]/orders/to-do",
        label: "A fazer",
        value: "to-do",
      },
      {
        path: "/dashboard/shop/[shopId]/orders/in-progress",
        label: "Em andamento",
        value: "in-progress",
      },
      {
        path: "/dashboard/shop/[shopId]/orders/delivery",
        label: "Entregas",
        value: "delivery",
      },
      {
        path: "/dashboard/shop/[shopId]/orders/pick-up",
        label: "Retiradas",
        value: "pick-up",
      },
      {
        path: "/dashboard/shop/[shopId]/orders/completed",
        label: "Histórico",
        value: "completed",
      },
    ],
  },
  {
    label: "Configurações",
    value: "settings",
    items: [
      {
        label: "Informações da loja",
        value: "general",
        path: "/dashboard/shop/[shopId]/settings/general",
      },
      {
        label: "Categorias",
        value: "categories",
        path: "/dashboard/shop/[shopId]/settings/categories",
      },
      {
        label: "Produtos",
        value: "items",
        path: "/dashboard/shop/[shopId]/settings/items",
      },
      {
        label: "Adicionais",
        value: "additional",
        path: "/dashboard/shop/[shopId]/settings/additional",
      },
    ],
  },
];

export default function NavItemHandler() {
  const { isAdmin, goTo } = useShopSegmentURL();

  return (
    <Accordion
      defaultIndex={[0, 1]}
      allowMultiple
      allowToggle
      className="w-full"
    >
      {(isAdmin ? ShopAdminNavItems : ShopNavItems).map((nav) => (
        <AccordionItem key={uuid()} className="w-full rounded-md border-none">
          <AccordionButton onClick={() => nav.path && goTo(nav.path || "")}>
            <Text>{nav.label}</Text>
            <Spacer />
            {nav.items && <AccordionIcon />}
          </AccordionButton>

          {nav.items && (
            <AccordionPanel>
              <VStack className="items-start space-y-0 border-l-2 border-gray-400">
                {nav.items?.map((subItem) => (
                  <Box
                    role="button"
                    onClick={() => goTo(subItem.path as string)}
                    key={subItem.path}
                    className="w-full p-2"
                  >
                    <Text className="ml-4">{subItem.label}</Text>
                  </Box>
                ))}
              </VStack>
            </AccordionPanel>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
