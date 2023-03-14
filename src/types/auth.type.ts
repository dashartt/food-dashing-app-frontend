type ISignOrigin = {
  shopId?: string;
};

export type ISignUp = ISignOrigin & {
  fullName: string;
  password?: string;
  email: string;
  role?: "customer" | "admin" | "deliveryman";
};

export type ISignIn = Omit<ISignUp, "fullName">;
