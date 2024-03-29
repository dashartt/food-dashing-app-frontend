import axios from "axios";

import type { IAddress } from "@/types/address.type";
import type { IApiResponse, ISignInResponse } from "@/types/api.type";
import type { ISignIn, ISignUp } from "@/types/auth.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const signup = async (values: ISignUp) =>
  axios
    .post(`${API_URL}/user/signup`, values)
    .then((response) => response.data)
    .catch((error) => error.response.data);

export const signin = async (values: ISignIn) =>
  axios
    .post(`${API_URL}/user/signin`, values)
    .then((response) => response.data as IApiResponse<ISignInResponse>)
    .catch((error) => error.response.data as IApiResponse<ISignInResponse>);

export const verifyAuth = async (token: string) =>
  axios
    .get(`${API_URL}/user/auth`, { headers: { Authorization: token } })
    .then((response) => {
      console.log("response from SERVICE: ", response);
      return response?.data;
    })
    .catch((error) => {
      console.log("response from SERVICE: ", error.response);
      return error.response?.data;
    });

export const addAddress = async (userId: string, values: IAddress) =>
  axios
    .post(`${API_URL}/user/${userId}/address`, values)
    .then((response) => response.data as IApiResponse)
    .catch((error) => error.response.data as IApiResponse);
