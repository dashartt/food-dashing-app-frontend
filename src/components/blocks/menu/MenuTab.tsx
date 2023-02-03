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
          <TabList className="bg-black font-bold sticky top-[5rem] z-10 pb-3 md:pb-6 border-none">
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
            <TabPanel className=" overflow-y-auto max-h-[85vh] bg-black">
              <MenuItemList category="salty pizza" />
            </TabPanel>
            <TabPanel className=" overflow-y-auto max-h-[85vh] bg-black">
              <MenuItemList category="sweet pizza" />
            </TabPanel>
            <TabPanel className=" overflow-y-auto max-h-[85vh] bg-black">
              <MenuItemList category="arabic snack" />
            </TabPanel>
            <TabPanel className=" overflow-y-auto max-h-[85vh] bg-black">
              <MenuItemList category="drinks" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
}
