"use client";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchMenuItems() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<BiSearch className="text-lg text-gray-600" />}
            />
            <Input
              placeholder="O que você deseja comer hoje?"
              className="rounded-none bg-white text-gray-600 placeholder:text-gray-600"
            />
          </InputGroup>
        </>
      )}
    </>
  );
}
