import type { IProperties } from "./geoapify.type";

export interface IAddress
  extends Pick<
    IProperties,
    | "lat"
    | "lon"
    | "place_id"
    | "street"
    | "housenumber"
    | "suburb"
    | "city"
    | "state_code"
    | "postcode"
    | "country"
  > {
  _id?: string;
  complement?: string;
  referencePoint?: string;
}
