import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import type { IAdditional, IItemCategory } from "@/types/shop.type";

import AdditionalCard from "../cards/shop-setup/AdditionalCard";

type Props = {
  categories: IItemCategory[];
  additional: IAdditional[];
};

export default function AdditionalTabs({ categories, additional }: Props) {
  return (
    <Tabs className="w-full">
      <TabList className="max-w-full overflow-x-auto overflow-y-hidden pb-4">
        {categories.map((category) => (
          <Tab key={uuid()}>{category.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {categories.map((category) => (
          <TabPanel key={uuid()}>
            {additional.filter((additional_) =>
              additional_.categories?.some(
                (category_) => category_?.name === category.name
              )
            ).length > 0 ? (
              additional
                .filter((additional_) =>
                  additional_.categories?.some(
                    (category_) => category_?.name === category.name
                  )
                )
                .map((additional_) => (
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
