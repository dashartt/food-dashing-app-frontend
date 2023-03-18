"use client";

import { useEffect, useState } from "react";

import ShopAdditionalSettings from "./ShopAdditionalSettings";
import ShopCategoriesSettings from "./ShopCategoriesSettings";
import ShopGeneralSettings from "./ShopGeneralSettings";
import ShopItemsSettings from "./ShopItemsSettings";

type ISettingsOption = "general" | "categories" | "items" | "additional";
type PageParams = {
  params: { option: ISettingsOption };
};

const RenderSettingsByOption = {
  general: <ShopGeneralSettings />,
  categories: <ShopCategoriesSettings />,
  items: <ShopItemsSettings />,
  additional: <ShopAdditionalSettings />,
};

export default function ShopSettingsPage({ params }: PageParams) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted && RenderSettingsByOption[params.option]}</>;
}
