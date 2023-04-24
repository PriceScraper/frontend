import { ItemUnit } from "./ItemUnit";
import { TrackedItem } from "./TrackedItem";

export class Item {
  public id: number;
  public producer: string;
  public name: string;
  public image: string;
  public quantity: number;
  public unit: ItemUnit;
  public ingredients: string;
  public trackedItems: TrackedItem[];

  constructor(
    id: number,
    producer: string,
    name: string,
    image: string,
    quantity: number,
    unit: ItemUnit,
    ingredients: string,
    trackedItems: TrackedItem[]
  ) {
    this.id = id;
    this.producer = producer;
    this.name = name;
    this.image = image;
    this.quantity = quantity;
    this.unit = unit;
    this.ingredients = ingredients;
    this.trackedItems = trackedItems;
  }
}
