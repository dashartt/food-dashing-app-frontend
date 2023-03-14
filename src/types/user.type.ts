import type { IUuid } from ".";
import type { IAddress } from "./address.type";

export type ICredential = {
  email: string;
  password: string;
  role: "customer" | "admin" | "deliveryman";
};
export type IUser = IUuid &
  ICredential & {
    fullName: string;
    addresses: Partial<IAddress>[];
  };
