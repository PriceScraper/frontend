import { findTrackedItemWithLowestPrice } from "../../utils/item.util";
import { TrackedItem } from "../../models/TrackedItem";
import { Shop } from "../../models/Shop";
import { ItemPrice } from "../../models/ItemPrice";

test("findTrackedItemWithLowestPrice returns lowest price", () => {
  const trackedItems = [
    new TrackedItem("", new Shop(1, "", ""), null, [
      new ItemPrice(1, null, "", 1.79),
    ]),
    new TrackedItem("", new Shop(1, "", ""), null, [
      new ItemPrice(1, null, "", 1.75),
    ]),
  ];
  expect(findTrackedItemWithLowestPrice(trackedItems)).toBe(1.75);
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
