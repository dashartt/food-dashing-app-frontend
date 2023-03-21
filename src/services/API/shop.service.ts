import axios from "axios";

import type {
  IApiResponse,
  ICheckDataDuplicityResponse,
} from "@/types/api.type";
import type { IShopSettings } from "@/types/shop.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// export const checkShopAddressDuplicity = async (addressExternalId: string) =>
//   axios
//     .get(`${API_URL}/shops/?addressExternalId=${addressExternalId}`)
//     .then((response) => response.data as IApiResponse<IShopSettings[]>)
//     .catch((error) => error.response.data as IApiResponse<IShopSettings[]>);

// INSERT SHOP INFO ------------------------------>
export const addShop = async (shopInfo: Partial<IShopSettings>) =>
  axios
    .post(`${API_URL}/shops`, shopInfo)
    .then((response) => response.data as IApiResponse<IShopSettings>)
    .catch((error) => error.response.data as IApiResponse);

export const saveShopSettings = (
  shopId: string,
  values: Partial<IShopSettings>
) =>
  axios
    .patch(`${API_URL}/shops/${shopId}`, {
      ...values,
    })
    .then((response) => response.data as IApiResponse<IShopSettings>)
    .catch((error) => error.response.data as IApiResponse);

// GETTERS SHOP INFO ---------------------->
export const getShopsByOwnerId = async (ownerId: string) =>
  axios
    .get(`${API_URL}/shops/?ownerId=${ownerId}`)
    .then((response) => response.data as IApiResponse<IShopSettings[]>)
    .catch((error) => error.response.data as IApiResponse<IShopSettings[]>);

export const getShopById = async (shopId: string) =>
  axios
    .get(`${API_URL}/shops/?shopId=${shopId}`)
    .then((response) => response.data as IApiResponse<IShopSettings>)
    .catch((error) => error.response.data as IApiResponse);

// CHECK DATA DUPLICITY -------------->
export const checkShopNameDuplicity = async (shopName: string) =>
  axios
    .get(`${API_URL}/shops/?shopName=${shopName}`)
    .then(
      (response) => response.data as IApiResponse<ICheckDataDuplicityResponse>
    )
    .catch(
      (error) =>
        error.response.data as IApiResponse<ICheckDataDuplicityResponse>
    );

export const checkShopAddressDuplicity = async (
  placeId: string,
  houseNumber: string
) =>
  axios
    .get(
      `${API_URL}/shops/?addressPlaceIdAndHouseNumber=${placeId}|${houseNumber}`
    )
    .then(
      (response) => response.data as IApiResponse<ICheckDataDuplicityResponse>
    )
    .catch(
      (error) =>
        error.response.data as IApiResponse<ICheckDataDuplicityResponse>
    );
