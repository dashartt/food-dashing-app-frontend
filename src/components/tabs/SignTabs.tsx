import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";

const tabSelectedStyle = {
  _selected: {
    color: "green.400",
    fontWeight: "900",
    borderBottomColor: "green.400",
    borderBottomWidth: "4px",
  },
};

const TabItems = ["Criar conta", "Entrar"];

export default function SignTabs() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs tabIndex={tabIndex} isFitted isLazy>
      <TabList>
        {TabItems.map((tab) => (
          <Tab key={uuid()} {...tabSelectedStyle}>
            {tab}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        <TabPanel>
          <SignUpForm setTabIndex={setTabIndex} />
        </TabPanel>
        <TabPanel>
          <SignInForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
