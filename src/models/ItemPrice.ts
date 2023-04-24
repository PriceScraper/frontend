import { TrackedItem } from "./TrackedItem";

export class ItemPrice {
  public id: number;
  public item: TrackedItem | null;
  public timestamp: string;
  public price: number;

  constructor(
    id: number,
    item: TrackedItem | null,
    timestamp: string,
    price: number
  ) {
    this.id = id;
    this.item = item;
    this.timestamp = timestamp;
    this.price = price;
  }
}
