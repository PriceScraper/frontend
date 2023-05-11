import { ShoppingList } from "../models/ShoppingList";
import axios from "axios";

export async function fetchShoppingListForUser(): Promise<ShoppingList[]> {
  const res = await axios.get<ShoppingList[]>(
    `${process.env.REACT_APP_BACKEND_URL!}/shoppinglists`
  );
  return res.data;
}

export async function createShoppingListForUser(title: string) {
  console.log("test");
  await axios.post(`${process.env.REACT_APP_BACKEND_URL!}/shoppinglists`, {
    title,
  });
}

export async function deleteShoppingListForUser(id: number) {
  await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL!}/shoppinglists/${id}`
  );
}

export async function addItemToShoppingList(
  shoppingListId: number,
  itemId: number,
  quantity: number
) {
  await axios.post(
    `${process.env.REACT_APP_BACKEND_URL!}/shoppinglists/items/add`,
    { shoppingListId, itemId, quantity }
  );
}

export async function deleteItemFromShoppingList(
  shoppingListId: number,
  itemId: number,
  quantity: number
) {
  await axios.post(
    `${process.env.REACT_APP_BACKEND_URL!}/shoppinglists/items/delete`,
    { shoppingListId, itemId, quantity }
  );
}
