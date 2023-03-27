import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

import type { IItemCategory, IMenuItem } from "@/types/shop.type";

import MenuItemCard from "../cards/MenuItemCard";

type Props = {
  categories: Partial<IItemCategory>[];
  menu: IMenuItem[];
};

export default function MenuItemsTabs({ categories, menu }: Props) {
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
                  .map((item) => (
                    <MenuItemCard asButton key={item._id} menuItem={item} />
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
