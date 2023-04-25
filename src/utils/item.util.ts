import { TrackedItem } from "../models/TrackedItem";

export function findTrackedItemWithLowestPrice(trackedItems: TrackedItem[]) {
  if (trackedItems.length === 0)
    throw new Error("can't find lowest price of empty tracked items array");
  return trackedItems.reduce((prev, current) => {
    if (current.prices.length === 0)
      throw new Error("can't lowest price of empty prices array");
    return prev <= current.prices[0].price ? prev : current.prices[0].price;
  }, Number.MAX_SAFE_INTEGER);
}
