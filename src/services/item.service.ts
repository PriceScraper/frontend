import {Item} from "../models/Item";
import axios from "axios";

export async function fetchItem(id: number): Promise<Item> {
  const res = await axios.get(
    `/items/${id}`
  );
  return res.data;
}