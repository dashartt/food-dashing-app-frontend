import type { IAddress } from "./address.type";
import type { IMenuItem, IShopSettings } from "./shop.type";
import type { IUser } from "./user.type";

export type IUuid = {
  _id?: string;
};

export interface ICredentials {
  phone: string;
  password: string;
}

export interface IAccount extends ICredentials {
  _id?: string;
  fullName: string;
  role: string;
  addressesId?: string[];
}

export interface IClientAccount extends Omit<IAccount, "password"> {}

// MENU TYPE ---------------------->
// export interface IMenu extends Array<IMenuItem> {}

// MENU ITEM CATEGORY TYPE ---------------------->
export type IMenuItemCategory =
  | "salty pizza"
  | "sweet pizza"
  | "arabic snack"
  | "drinks";

// ITEM CATEGORY TYPE ------------->
export interface IITemCategory {
  _id?: ObjectId;
  name: string;
}

// SHOPPING CART ITEM TYPE ---------------------->

export interface ICartItem {
  _id?: string;
  item: IMenuItem[] | Array<IMenuItem | null>;
  quantity?: number;
  borderType?: string;
  observation?: string;
  additional?: IAdditional[];
}

// CHECKOUT TYPE ---------------------->

export interface IOrderItem {
  item: string[];
  quantity?: number;
  observation?: string;
  borderType?: string;
  additional?: IAdditional[];
}

export interface IOrder extends IUuid, ITimestamps {
  shop: Partial<IShopSettings>;
  client: Partial<IUser>;
  address: Partial<IAddress>;
  items: ICartItem[];
  paymentType: string;
  isDelivery: boolean;
  hasPayBack?: boolean;
  payback?: number;
  orderCount?: number;
  status?: string;
}

export interface IPaymentType extends String<"card" | "cash"> {}

export interface ITimestamps {
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderSearchParams {
  today: boolean;
  status: string;
}
