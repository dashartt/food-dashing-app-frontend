"use client";

import { useEffect, useState } from "react";

import MenuTabs from "@/components/tabs/MenuTabs";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <MenuTabs
          tabListClass="bg-white font-bold sticky top-[5.1rem] md:top-20 z-10 border-b-2 border-gray-300"
          categories={["salty pizza", "sweet pizza", "drinks", "arabic snack"]}
        />
      )}
    </>
  );
}
