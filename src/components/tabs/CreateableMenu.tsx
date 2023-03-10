import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

import type { IMenu } from "@/types/shop/menu";
import { formatCurrency } from "@/utils/format.util";

type Props = {
  categories: string[];
  menu: IMenu[];
};

export default function CreateableMenu({ categories, menu }: Props) {
  return (
    <Tabs className="w-full">
      <TabList className="max-w-full overflow-x-auto overflow-y-hidden pb-4">
        {categories.map((category) => (
          <Tab
            _selected={{
              color: "black",
              borderBottom: "4px solid black",
            }}
            key={category}
          >
            {category}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {categories.map((categoryName) => (
          <TabPanel key={categoryName}>
            {menu.filter((item) => item.category === categoryName).length >
            0 ? (
              menu
                .filter((item) => item.category === categoryName)
                .map(({ item, category }) => (
                  <Card key={`${category}-${item.name}`}>
                    <CardBody>
                      <HStack>
                        <VStack className="w-full items-start">
                          <Text>{item.name}</Text>
                          <Text className="text-gray-600">
                            {item.ingredients}
                          </Text>
                          <Text>{`R$ ${formatCurrency(item.price)}`}</Text>
                        </VStack>
                        <IconButton
                          className="self-start"
                          aria-label="Excluir produto do cardápio"
                          icon={<MdClose />}
                        />
                      </HStack>
                    </CardBody>
                  </Card>
                ))
            ) : (
              <Text>Nenhum produto dessa categoria</Text>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
