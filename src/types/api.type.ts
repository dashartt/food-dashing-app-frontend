export type IApiResponse<T = null> = {
  data: T | null;
  message: string;
};

export type ICheckDataDuplicityResponse = {
  isDuplicated: boolean;
};
