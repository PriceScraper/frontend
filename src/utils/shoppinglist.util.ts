import { ShoppingListLine } from "../models/ShoppingListLine";
import { findTrackedItemWithLowestPrice } from "./item.util";
import { getShopNameFromDomain } from "./shop.util";

export function getTotalByLines(
  lines: ShoppingListLine[],
  whiteListedShops: string[]
) {
  return lines === null
    ? 0
    : lines
        .reduce(
          (prev, current) =>
            prev +
            (current.item.trackedItems !== null &&
            current.item.trackedItems.filter((t) =>
              whiteListedShops.includes(getShopNameFromDomain(t.shop.name))
            ).length > 0
              ? findTrackedItemWithLowestPrice(
                  current.item.trackedItems.filter((t) =>
                    whiteListedShops.includes(
                      getShopNameFromDomain(t.shop.name)
                    )
                  )
                ).itemPrices[0].price * current.quantity
              : 0),
          0.0
        )
        .toFixed(2);
}
