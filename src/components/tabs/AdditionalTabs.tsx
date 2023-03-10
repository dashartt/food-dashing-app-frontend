import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import type { IAdditional, ICategory } from "@/types/shop/menu";
import { formatCurrency } from "@/utils/format.util";

type Props = {
  categories: ICategory[];
  additional: IAdditional[];
};

export default function AdditionalTabs({ categories, additional }: Props) {
  return (
    <Tabs isFitted className="w-full">
      <TabList className="max-w-full overflow-x-auto overflow-y-hidden pb-4">
        {categories.map((category) => (
          <Tab key={category.name}>{category.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {categories.map((category) => (
          <TabPanel key={`${category.name.concat("-")}`}>
            {additional.filter((additional_) =>
              additional_.categories.some(
                (category_) => category_?.name === category.name
              )
            ).length > 0 ? (
              additional.map((additional_) => (
                <HStack
                  key={additional_.categories
                    .join(", ")
                    .concat("-", additional_.name)}
                >
                  <Text>{additional_.name}</Text>
                  <Text>{`R$ ${formatCurrency(additional_.price)}`}</Text>
                </HStack>
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
