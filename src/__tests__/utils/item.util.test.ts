import {findTrackedItemWithLowestPrice, onePricePerDay} from "../../utils/item.util";
import {TrackedItem} from "../../models/TrackedItem";
import {Shop} from "../../models/Shop";
import {ItemPrice} from "../../models/ItemPrice";
import {Item} from "../../models/Item";
import {ItemUnit} from "../../models/ItemUnit";

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
  const i = new Item(1, "", "", "", 1, new ItemUnit(1, 1), "", [
    new TrackedItem("", new Shop(1, "aldi.be", ""), null, [
      new ItemPrice(1, null, "", 1.75),
    ]),
  ]);
  expect(i.id).toBe(1)
});

test("one price per day", () => {
  const prices: ItemPrice[] = [
    {id: 1, price: 3, timestamp: "2023-04-05T01:01:01", item: null},
    {id: 2, price: 3, timestamp: "2023-04-05T02:01:01", item: null},
    {id: 3, price: 3, timestamp: "2023-04-06T01:01:01", item: null},
  ]
  expect(prices.length).toBe(3)
  expect(onePricePerDay(prices).length).toBe(2)
})
