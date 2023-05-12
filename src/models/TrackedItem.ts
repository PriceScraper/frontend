import { Shop } from "./Shop";
import { Item } from "./Item";
import { ItemPrice } from "./ItemPrice";

export class TrackedItem {
  public url: string;
  public shop: Shop;
  public item: Item | null;
  public itemPrices: ItemPrice[];

  constructor(url: string, shop: Shop, item: Item | null, prices: ItemPrice[]) {
    this.url = url;
    this.shop = shop;
    this.item = item;
    this.itemPrices = prices;
  }
}
