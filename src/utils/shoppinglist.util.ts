import { ShoppingListLine } from "../models/ShoppingListLine";
import { findTrackedItemWithLowestPrice } from "./item.util";

export function getTotalByLines(lines: ShoppingListLine[]) {
  return lines === null
    ? 0
    : lines
        .reduce(
          (prev, current) =>
            prev +
            (current.item.trackedItems !== null
              ? findTrackedItemWithLowestPrice(current.item.trackedItems)
                  .itemPrices[0].price * current.quantity
              : 0),
          0.0
        )
        .toFixed(2);
}
