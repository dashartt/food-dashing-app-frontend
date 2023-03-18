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
    email: string;
    // add
  };
};
