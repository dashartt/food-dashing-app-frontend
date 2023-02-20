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
export interface IMenu extends Array<IMenuItem> {}

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

// MENU ITEM TYPE ---------------------->
export interface IMenuItem {
  _id: string;
  category: IITemCategory;
  name: string;
  price: number;
  ingredients?: string;
  quantity?: number;
  observation?: string;
}

// SHOPPING CART TYPE ---------------------->
export interface ICartItems extends Array<ICartItem> {}

// SHOPPING CART ITEM TYPE ---------------------->

export interface IAdditional {
  _id?: string;
  name: string;
  price: number;
  categoryId: string;
}

export interface ICartItem {
  _id?: string;
  item: IMenuItem[] | Array<IMenuItem | null>;
  quantity?: number;
  observation?: string;
}

// ADDRESS STORE ZUSTAND TYPE --------------------->
export interface IAddress {
  _id?: string;
  addressName: string;
  addressNumber: string;
  complement: string;
  referencePoint: string;
  districtName: string;
}

export interface IAddresses extends Array<IAddress> {}

// CHECKOUT TYPE ---------------------->

export interface IOrderItem {
  itemIds: string[];
  quantity?: number;
  observation?: string;
}

export interface IOrder {
  clientId: string;
  addressId: string;
  items: IOrderItem;
  paymentType: string;
  isDelivery: boolean;
  hasPayBack?: boolean;
  payback?: number;
}

export interface IPaymentType extends String<"card" | "cash"> {}

// ADMIN ORDER TYPE --------------------->

export interface IAdminOrder extends ITimestamps {
  _id: string;
  clientId: {
    _id: string;
    fullName: string;
    phone: string;
    addressesId: string[];
  };
  addressId: IAddress;
  orderItemsId: [
    {
      _id: string;
      itemIds: [
        {
          _id: string;
          name: string;
          price: number;
          ingredients: string;
          categoryId: string;
        }
      ];
      observation?: string;
      quantity: number;
    }
  ];
  status: string;
  orderCount: number;
  isDelivery: boolean;
  paymentType: string;
  payback: number;
}

export interface ITimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface IOrderSearchParams {
  today: boolean;
  status: string;
}
