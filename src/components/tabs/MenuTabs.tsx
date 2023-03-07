import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import MenuItemList from "@/components/list/MenuItemList";

type ICategory = "salty pizza" | "sweet pizza" | "arabic snack" | "drinks";

type IMenuTabsProps = {
  categories: ICategory[];
  tabListClass?: string;
};

export default function MenuTabs({
  categories,
  tabListClass = "",
}: IMenuTabsProps) {
  return (
    <Tabs isFitted className="w-full">
      <TabList className={`${tabListClass}`}>
        {categories.includes("salty pizza") && (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
          >
            Pizza salgada
          </Tab>
        )}
        {categories.includes("sweet pizza") && (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
          >
            Pizza doce
          </Tab>
        )}
        {categories.includes("arabic snack") && (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
          >
            Lanche árabe
          </Tab>
        )}
        {categories.includes("drinks") && (
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
        {categories.includes("salty pizza") && (
          <TabPanel>
            <MenuItemList category="salty pizza" />
          </TabPanel>
        )}
        {categories.includes("sweet pizza") && (
          <TabPanel>
            <MenuItemList category="sweet pizza" />
          </TabPanel>
        )}
        {categories.includes("arabic snack") && (
          <TabPanel>
            <MenuItemList category="arabic snack" />
          </TabPanel>
        )}
        {categories.includes("drinks") && (
          <TabPanel>
            <MenuItemList category="drinks" />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
}
