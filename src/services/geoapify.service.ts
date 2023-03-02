import axios from "axios";

const BASE_URL = "https://api.geoapify.com/v1";
const API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

export const routeMatrix = async (fromPoint: number[], toPoint: number[]) =>
  axios.post(
    `${BASE_URL}/routematrix?${new URLSearchParams({
      apiKey: API_KEY as string,
    })}`,
    {
      mode: "scooter",
      sources: [{ location: fromPoint }],
      targets: [{ location: toPoint }],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
