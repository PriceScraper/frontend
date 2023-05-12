import { getTotalByLines } from "../../utils/shoppinglist.util";
import { ShoppingListLine } from "../../models/ShoppingListLine";
import { Item } from "../../models/Item";
import { ItemUnit } from "../../models/ItemUnit";
import { TrackedItem } from "../../models/TrackedItem";
import { Shop } from "../../models/Shop";
import { ItemPrice } from "../../models/ItemPrice";

const lines: ShoppingListLine[] = [];
lines.push(
  new ShoppingListLine(
    1,
    new Item(1, "", "", "", 1, new ItemUnit(1, 1), "", [
      new TrackedItem("1", new Shop(1, "carrefour.be", ""), null, [
        new ItemPrice(1, null, "", 1.49),
      ]),
    ]),
    1
  )
);
test("get total should be positive", () => {
  const total = getTotalByLines(lines, ["aldi", "carrefour"]);
  expect(total).toBe("1.49");
});

test("get total should be zero", () => {
  const total = getTotalByLines([], ["aldi", "carrefour"]);
  expect(total).toBe("0.00");
});
