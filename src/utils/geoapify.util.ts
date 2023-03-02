import type {
  // IGeocodeResponse,
  IRouteMatrix,
} from "@/types/geoapify.type";

import * as geoapify from "../services/geoapify.service";
import { formatMetersToKilometers } from "./format.util";

// get distance in km between two addressess ------------------------->
export const getDistanceBetweenAddressess = async (
  fromPoint: number[],
  toPoint: number[]
) => {
  const response = await geoapify.routeMatrix(fromPoint, toPoint);
  if (response.status === 200) {
    const data = response.data as IRouteMatrix;
    if (data.sources_to_targets[0] && data.sources_to_targets[0][0]) {
      return formatMetersToKilometers(data.sources_to_targets[0][0].distance);
    }
  }
  return null;
};

// calculate delivery fee by distance-------------------------------------------->
const deliveryFeeByDistance = [
  // need customize values
  {
    overToKm: 0,
    price: 3,
  },
  {
    overToKm: 3.5,
    price: 5,
  },
  {
    overToKm: 4.5,
    price: 10,
  },
];

const getPriceMatechedByDistance = (distance: number) => {
  const mapPricesMatchedByDistance = deliveryFeeByDistance
    .filter(({ overToKm }) => distance >= overToKm)
    .map(({ price }) => price);

  return Math.max(...mapPricesMatchedByDistance);
};

export const calculateDeliveryFee = async (
  fromPoint: number[],
  toPoint: number[]
) => {
  const distance = await getDistanceBetweenAddressess(fromPoint, toPoint);
  const price = getPriceMatechedByDistance(distance || 0);

  return price;
};
