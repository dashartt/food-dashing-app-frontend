export type IApiResponse<T> = {
  data: T | null;
  message: string;
};

export type ICheckShopNameResponse = {
  isDuplicated: boolean;
};
