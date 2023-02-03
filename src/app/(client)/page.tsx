"use client";

import { useEffect, useState } from "react";
import MenuTab from "src/components/blocks/menu/MenuTab";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    throw new Error(".");
  }, []);

  return <>{mounted && <MenuTab />}</>;
}
