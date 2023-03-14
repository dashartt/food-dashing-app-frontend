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

export const signin = async (values: ISignIn) => {
  const response = await fetch(`${API_URL}/user/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(values),
  });
  const responseData = await response.json();
  return responseData;
};
