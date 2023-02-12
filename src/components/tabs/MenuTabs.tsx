import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import MenuItemList from "@/components/blocks/menu/MenuItemList";

type MenuItem = "salty pizza" | "sweet pizza" | "arabic snack" | "drinks";

type MenuTabsProps = {
  items: MenuItem[];
};

export default function MenuTabs({ items }: MenuTabsProps) {
  return (
    <Tabs isFitted className="w-full">
      <TabList className="sticky top-0 z-10 bg-white">
        {items.includes("salty pizza") && (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
          >
            Pizza salgada
          </Tab>
        )}
        {items.includes("sweet pizza") && (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
          >
            Pizza doce
          </Tab>
        )}
        {items.includes("arabic snack") && (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
          >
            Lanche árabe
          </Tab>
        )}
        {items.includes("drinks") && (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
          >
            Bebidas
          </Tab>
        )}
      </TabList>

      <TabPanels>
        {items.includes("salty pizza") && (
          <TabPanel>
            <MenuItemList category="salty pizza" />
          </TabPanel>
        )}
        {items.includes("sweet pizza") && (
          <TabPanel>
            <MenuItemList category="sweet pizza" />
          </TabPanel>
        )}
        {items.includes("arabic snack") && (
          <TabPanel>
            <MenuItemList category="arabic snack" />
          </TabPanel>
        )}
        {items.includes("drinks") && (
          <TabPanel>
            <MenuItemList category="drinks" />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
}
