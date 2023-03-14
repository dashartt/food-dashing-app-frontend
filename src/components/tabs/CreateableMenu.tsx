import {
  Card,
  CardBody,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

import useMenu from "@/store/shop/setup/useMenu";
import type { IItemCategory, IMenuItem } from "@/types/shop/menu.type";
import { formatCurrency } from "@/utils/format.util";

type Props = {
  categories: IItemCategory[];
  menu: IMenuItem[];
};

export default function CreateableMenu({ categories, menu }: Props) {
  const { setMenu } = useMenu();

  const onRemoveMenuItem = (category: string, name: string) => {
    setMenu(
      menu.filter(
        (item) => item.category.name !== category && item.name !== name
      )
    );
  };

  return (
    <Tabs className="w-full">
      <TabList className="max-w-full overflow-x-auto overflow-y-hidden pb-4">
        {categories.map((category) => (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
            key={category.name}
          >
            {category.name}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {categories.map((category_) => (
          <TabPanel key={category_.name}>
            <VStack className="w-full space-y-6">
              {menu.filter((item) => item.category.name === category_.name)
                .length > 0 ? (
                menu
                  .filter((item) => item.category.name === category_.name)
                  .map(({ category, name, price, ingredients }) => (
                    <Card
                      key={`${category.name}-${name}`}
                      className="relative w-full"
                      variant="outline"
                    >
                      <CardBody>
                        <VStack className="w-full items-start">
                          <Text>{name}</Text>
                          <Text className="text-gray-600">
                            {ingredients || ""}
                          </Text>
                          <Text>{`R$ ${formatCurrency(price)}`}</Text>
                        </VStack>
                        <IconButton
                          onClick={() =>
                            onRemoveMenuItem(category.name || "", name)
                          }
                          className="absolute top-0 right-0 self-start bg-white hover:bg-white active:bg-white"
                          aria-label="Excluir produto do cardápio"
                          icon={<MdClose />}
                        />
                      </CardBody>
                    </Card>
                  ))
              ) : (
                <Text>Nenhum produto dessa categoria</Text>
              )}
            </VStack>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
