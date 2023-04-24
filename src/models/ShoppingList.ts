import { Item } from "./Item";

export class ShoppingList {
  id: number;
  title: string;
  items: Item[];

  constructor(id: number, title: string, items: Item[]) {
    this.id = id;
    this.title = title;
    this.items = items;
  }
}
