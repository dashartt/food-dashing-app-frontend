import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import type { IAdditional, ICategory } from "@/types/shop/menu";

import AdditionalCard from "../cards/shop-setup/AdditionalCard";

type Props = {
  categories: ICategory[];
  additional: IAdditional[];
};

export default function AdditionalTabs({ categories, additional }: Props) {
  return (
    <Tabs isFitted className="w-full">
      <TabList className="max-w-full overflow-x-auto overflow-y-hidden pb-4">
        {categories.map((category) => (
          <Tab key={uuid()}>{category.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {categories.map((category) => (
          <TabPanel key={uuid()}>
            {additional.length > 0 &&
            additional.filter((additional_) =>
              additional_.categories.some(
                (category_) => category_?.name === category.name
              )
            ).length > 0 ? (
              additional.map((additional_) => (
                <AdditionalCard
                  key={uuid()}
                  additional={additional_}
                  category={category}
                />
              ))
            ) : (
              <Text>Nenhum adicional dessa categoria</Text>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
