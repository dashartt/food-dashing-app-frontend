import type { IAddress } from "./address.type";

export type IApiResponse<T = null> = {
  data: T | null;
  message: string;
};

export type ICheckDataDuplicityResponse = {
  isDuplicated: boolean;
};

export type ISignInResponse = {
  token: string;
  user: {
    _id: string;
    role: string;
    fullName: string;
    addresses?: IAddress[];
    email: string;
    // add
  };
};
