import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";

import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";

export default function SignTabs() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs tabIndex={tabIndex} isFitted isLazy>
      <TabList>
        <Tab
          _selected={{
            borderBottomColor: "gray.default",
            borderBottomWidth: "4px",
          }}
        >
          Criar conta
        </Tab>
        <Tab
          _selected={{
            borderBottomColor: "gray.default",
            borderBottomWidth: "4px",
          }}
        >
          Entrar
        </Tab>
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
