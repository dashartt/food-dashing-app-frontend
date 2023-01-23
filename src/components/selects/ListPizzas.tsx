import { Box, Select } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { ChangeEventHandler } from "react";
import { useEffect, useState } from "react";
import useAnotherHalfPizzaState from "src/store/pizza/useAnotherHalfPizza";

import { getMenuItemsByCategory } from "@/services/api";

export default function ListPizzas() {
  const [mounted, setMounted] = useState(false);

  const { data: items } = useQuery({
    queryKey: ["menuItem/salty pizza"],
    queryFn: () => getMenuItemsByCategory("salty pizza"),
  });

  const getAnotherHalf = useAnotherHalfPizzaState(
    (state) => state.getAnotherHalf
  );

  const handlerPizza: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    const item = items?.find((item_) => item_.name === target.value);
    if (item) getAnotherHalf(item);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <Box className="mt-4">
          <Select
            className="rounded-none border border-gray-400"
            onChange={handlerPizza}
          >
            <option value="" className="hidden">
              Selecione a outra metade
            </option>
            {items?.map((item) => (
              <option key={item._id} id={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      )}
    </>
  );
}
