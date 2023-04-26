import { Item } from "../models/Item";
import { ItemSearchDto } from "../models/dtos/ItemSearchDto";
import axios from "axios";

export async function searchItem(name: string): Promise<ItemSearchDto[]> {
  if (name === "") return [];
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL!}/items?name=${name}`
  );
  return res.data;
}

export async function fetchItem(id: number): Promise<Item> {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL!}/items/${id}`
  );
  return res.data;
}