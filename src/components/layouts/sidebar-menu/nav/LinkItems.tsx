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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

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
    path: "/about",
  },
  {
    label: "Cardápio",
    value: "menu",
    path: "/",
  },
  {
    label: "Carrinho",
    value: "cart",
    path: "/cart",
  },
  {
    label: "Pedidos",
    value: "orders",
    path: "/history",
  },
  {
    label: "Conta",
    value: "account",
    path: "/account",
  },
];

export const ShopAdminNavItems: IShopNavItem[] = [
  {
    label: "Pedidos",
    value: "orders",
    items: [
      {
        path: "/admin/orders/to-do",
        label: "A fazer",
        value: "to-do",
      },
      {
        path: "/admin/orders/in-progress",
        label: "Em andamento",
        value: "in-progress",
      },
      {
        path: "/admin/orders/delivery",
        label: "Entregas",
        value: "delivery",
      },
      {
        path: "/admin/orders/pick-up",
        label: "Retiradas",
        value: "pick-up",
      },
      {
        path: "/admin/orders/completed",
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
        value: "shopInfo",
        path: "/admin/settings/shop-info",
      },
      {
        label: "Categorias",
        value: "categories",
        path: "/admin/settings/categories",
      },
      {
        label: "Produtos",
        value: "items",
        path: "/admin/settings/items",
      },
      {
        label: "Adicionais",
        value: "additional",
        path: "/admin/settings/additional",
      },
    ],
  },
];

export default function NavItemHandler() {
  const path = usePathname();
  const router = useRouter();
  const [, shopId = "", rolePath = ""] = path?.split("/") || [""];

  return (
    <Accordion allowToggle className="w-full">
      {(rolePath === "admin" ? ShopAdminNavItems : ShopNavItems).map((nav) => (
        <AccordionItem key={uuid()} className="w-full rounded-md border-none">
          <AccordionButton
            onClick={() =>
              rolePath !== "admin" && nav.path && router.push(nav.path)
            }
          >
            <Text>{nav.label}</Text>
            <Spacer />
            {nav.items && <AccordionIcon />}
          </AccordionButton>

          {nav.items && (
            <AccordionPanel>
              <VStack className="items-start space-y-0 border-l-2 border-gray-400">
                {nav.items?.map((subItem) => (
                  <Box key={subItem.path} className="w-full p-2">
                    <Link href={`/${shopId}/${subItem.path}`}>
                      <Text className="ml-4">{subItem.label}</Text>
                    </Link>
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

// ShopAdminNavItems.map((nav) => (
//   <AccordionItem key={uuid()} className="w-full rounded-md border-none">
//     <AccordionButton>
//       <Text>{nav.label}</Text>
//       <Spacer />
//       <AccordionIcon />
//     </AccordionButton>
//     <AccordionPanel>
//       <VStack className="items-start space-y-0 border-l-2 border-gray-400">
//         {nav.items.map((subItem) => (
//           <Box key={subItem.path} className="w-full p-2">
//             <Link
//               href={`/${shopId}${rolePath === "admin" && "/admin"}/${
//                 subItem.path
//               }`}
//             >
//               <Text className="ml-4">{subItem.label}</Text>
//             </Link>
//           </Box>
//         ))}
//       </VStack>
//     </AccordionPanel>
//   </AccordionItem>
// ))}
