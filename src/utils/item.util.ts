import {TrackedItem} from "../models/TrackedItem";
import {Item} from "../models/Item";
import {getShopNameFromDomain} from "./shop.util";

export function findTrackedItemWithLowestPrice(trackedItems: TrackedItem[]) {
  if (trackedItems.length === 0)
    throw new Error("can't find lowest price of empty tracked items array");
  return trackedItems.reduce((prev, current) => {
    if (current.itemPrices.length === 0)
      throw new Error("can't lowest price of empty prices array");
    return prev.itemPrices[0].price <= current.itemPrices[0].price
      ? prev
      : current;
  });
}

export function getWhiteListedTrackedItemsForItem(
  item: Item,
  whiteListedShops: string[]
) {
  return item.trackedItems.filter((trackedItem) =>
    whiteListedShops.includes(getShopNameFromDomain(trackedItem.shop.name))
  );
}
