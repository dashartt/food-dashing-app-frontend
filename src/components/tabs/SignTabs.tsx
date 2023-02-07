import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";

import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";

export default function SignTabs() {
  const [tabIndex, setTabIndex] = useState(1);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs isFitted isLazy index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        <Tab>Criar conta</Tab>
        <Tab>Entrar</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <SignUpForm handleTabsChange={handleTabsChange} />
        </TabPanel>
        <TabPanel>
          <SignInForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
