import axios from "axios";

import type { IApiResponse, ISignInResponse } from "@/types/api.type";
import type { ISignIn, ISignUp } from "@/types/auth.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const signup = async (values: ISignUp) => {
  const response = await fetch(`${API_URL}/user/signup`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(values),
  });

  const responseData = await response.json();
  return responseData;
};

export const signin = async (values: ISignIn) =>
  axios
    .post(`${API_URL}/user/signin`, values)
    .then((response) => response.data as IApiResponse<ISignInResponse>)
    .catch((error) => error.response.data as IApiResponse<ISignInResponse>);

// {

//   const response = await fetch(`${API_URL}/user/signin`, {
//     headers: { "Content-Type": "application/json" },
//     method: "POST",
//     mode: "cors",
//     body: JSON.stringify(values),
//   });
//   const responseData = await response.json();
//   return responseData;
// };
