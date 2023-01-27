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
        <Tabs className="w-full mt-0">
          <TabList className="bg-black font-bold top-0 sticky z-10 pb-3 ">
            <Tab
              color="gray.400"
              _selected={{
                color: "white",
                borderBottom: "3px solid white",
              }}
            >
              Pizza salgada
            </Tab>
            <Tab
              color="gray.400"
              _selected={{
                color: "white",
                borderBottom: "3px solid white",
              }}
            >
              Pizza doce
            </Tab>
            <Tab
              color="gray.400"
              _selected={{
                color: "white",
                borderBottom: "3px solid white",
              }}
            >
              Lanche árabe
            </Tab>
            <Tab
              color="gray.400"
              _selected={{
                color: "white",
                borderBottom: "3px solid white",
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
