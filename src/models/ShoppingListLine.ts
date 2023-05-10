import { Item } from "./Item";

export class ShoppingListLine {
  id: number;
  item: Item;
  quantity: number;

  constructor(id: number, item: Item, quantity: number) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
  }
}
