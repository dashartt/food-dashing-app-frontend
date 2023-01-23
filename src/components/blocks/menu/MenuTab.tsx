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
        <Tabs className="w-full">
          <TabList className="bg-[#eaeaeb] font-bold">
            <Tab
              _selected={{
                color: "#2994f3",
                borderBottom: "3px solid #2994f3",
              }}
            >
              Pizza salgada
            </Tab>
            <Tab
              _selected={{
                color: "#2994f3",
                borderBottom: "3px solid #2994f3",
              }}
            >
              Pizza doce
            </Tab>
            <Tab
              _selected={{
                color: "#2994f3",
                borderBottom: "3px solid #2994f3",
              }}
            >
              Lanche árabe
            </Tab>
            <Tab
              _selected={{
                color: "#2994f3",
                borderBottom: "3px solid #2994f3",
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
