import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import MenuItemList from "./MenuItemList";

export default function Menu() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Tabs isFitted className="w-full">
          <TabList className="bg-white font-bold sticky top-0 md:top-[5rem] z-10 border-b-2 border-gray-300">
            <Tab
              _selected={{
                color: "black",
                borderBottom: "4px solid black",
              }}
            >
              Pizza salgada
            </Tab>
            <Tab
              _selected={{
                color: "black",
                borderBottom: "4px solid black",
              }}
            >
              Pizza doce
            </Tab>
            <Tab
              _selected={{
                color: "black",
                borderBottom: "4px solid black",
              }}
            >
              Lanche árabe
            </Tab>
            <Tab
              _selected={{
                color: "black",
                borderBottom: "4px solid black",
              }}
            >
              Bebidas
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MenuItemList category="salty pizza" />
            </TabPanel>
            <TabPanel>
              <MenuItemList category="sweet pizza" />
            </TabPanel>
            <TabPanel>
              <MenuItemList category="arabic snack" />
            </TabPanel>
            <TabPanel>
              <MenuItemList category="drinks" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
}
