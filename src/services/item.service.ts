import { Item } from "../models/Item";
import { testItem } from "../constants";

export function searchItem(name: string): Item[] {
  if (name === "") return [];
  return [testItem];
}

export async function fetchItem(id: string): Promise<Item> {
  console.log(testItem);
  return testItem;
}
