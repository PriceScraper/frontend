import { findTrackedItemWithLowestPrice } from "../../utils/item.util";
import { TrackedItem } from "../../models/TrackedItem";
import { Shop } from "../../models/Shop";
import { ItemPrice } from "../../models/ItemPrice";
import { Item } from "../../models/Item";
import { ItemUnit } from "../../models/ItemUnit";

test("findTrackedItemWithLowestPrice returns lowest price", () => {
  const trackedItems = [
    new TrackedItem("", new Shop(1, "", ""), null, [
      new ItemPrice(1, null, "", 1.79),
    ]),
    new TrackedItem("", new Shop(1, "", ""), null, [
      new ItemPrice(1, null, "", 1.75),
    ]),
  ];
  expect(findTrackedItemWithLowestPrice(trackedItems).itemPrices[0].price).toBe(
    1.75
  );
});

test("findTrackedItemWithLowestPrice with empty prices should throw", () => {
  const trackedItems = [
    new TrackedItem("", new Shop(1, "", ""), null, []),
    new TrackedItem("", new Shop(1, "", ""), null, [
      new ItemPrice(1, null, "", 1.75),
    ]),
  ];
  expect(() => findTrackedItemWithLowestPrice(trackedItems)).toThrow();
});

test("findTrackedItemWithLowestPrice with empty tracked items should throw", () => {
  const trackedItems: TrackedItem[] = [];
  expect(() => findTrackedItemWithLowestPrice(trackedItems)).toThrow();
});

test("get whitelisted tracked items should return tracked item", () => {
  const item = new Item(1, "", "", "", 1, new ItemUnit(1, 1), "", [
    new TrackedItem("", new Shop(1, "aldi.be", ""), null, [
      new ItemPrice(1, null, "", 1.75),
    ]),
  ]);
});
