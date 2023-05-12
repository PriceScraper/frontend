import { ShoppingListLine } from "./ShoppingListLine";

export class ShoppingList {
  id: number;
  title: string;
  lines: ShoppingListLine[];

  constructor(id: number, title: string, lines: ShoppingListLine[]) {
    this.id = id;
    this.title = title;
    this.lines = lines;
  }
}
