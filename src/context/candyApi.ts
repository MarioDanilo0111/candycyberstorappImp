import axios from "axios";
import { Root } from "../types/candyShop.types";
import { RootId } from "../types/candyShopById.types";
import { RootTags } from "../types/tags.types";
import { RootTagById } from "../types/tagById.types";
import { OrderData } from "../types/OrderData.types";

/* create a fake_delay */
const FAKE_DELAY: number = 1500;

// Create a new axios instance
const instance = axios.create({
  baseURL: "https://www.bortakvall.se/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const get = async <T>(query: string) => {
  const response = await instance.get<T>(query);
  //SIMULATING A DELAY
  const fakeDelay = FAKE_DELAY;

  await new Promise<number>((resolve) =>
    setTimeout(resolve, Number(fakeDelay))
  );

  return response.data;
};

export const search = () => {
  return get<Root>("/products/");
};

export const searchById = (id: number): Promise<RootId> => {
  return get<RootId>(`/products/${id}`);
};

/* Tags for a dropDown implementation */
export const searchTags = () => {
  return get<RootTags>("tags");
};

/* Tags for a dropDown functionality */
export const searchTagById = (id: string) => {
  return get<RootTagById>(`/tags/${id}`);
};

/* Post orders to the API */
export const postShop = async (data: OrderData) => {
  const response = await instance.post(
    `/users/11/orders`,
    JSON.stringify(data)
  );
  return response.data;
};
