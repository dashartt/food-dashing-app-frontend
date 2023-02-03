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
        <Tabs isFitted className="w-full ">
          <TabList className="bg-white font-bold sticky top-[5rem] z-10  border-none">
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
            <TabPanel className=" overflow-y-auto max-h-[85vh]">
              <MenuItemList category="salty pizza" />
            </TabPanel>
            <TabPanel className=" overflow-y-auto max-h-[85vh]">
              <MenuItemList category="sweet pizza" />
            </TabPanel>
            <TabPanel className=" overflow-y-auto max-h-[85vh]">
              <MenuItemList category="arabic snack" />
            </TabPanel>
            <TabPanel className=" overflow-y-auto max-h-[85vh]">
              <MenuItemList category="drinks" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
}
