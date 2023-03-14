import type { IUuid } from ".";
import type { IAddress } from "./address.type";
import type { IUser } from "./user.type";

export type IItemCategory = IUuid & {
  name: string;
};

export type IMenuItem = IUuid & {
  category: Partial<IItemCategory>;
  name: string;
  price: number;
  ingredients?: string;
};

export type IAdditional = IUuid & {
  categories: Partial<IItemCategory[]>;
  name: string;
  price: number;
};

export type IShopOpeningHours = {
  daysOfWeek: Array<{ label: string; value: string }>;
  hours: { starts: string; ends: string };
};

export type IDeliveryFeeByDistance = { upToKm: number; price: number };

export type IShopSettings = IUuid & {
  owner: IUser;
  shopName: string;
  shopAddress: IAddress;
  shopOpeningHours: IShopOpeningHours;
  deliveryFees: IDeliveryFeeByDistance[];
  items: IMenuItem[];
  categories: IItemCategory[];
  additional: IAdditional[];
};
