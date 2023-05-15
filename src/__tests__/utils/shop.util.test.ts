import {
  getShopDominantColorByName,
  getShopLogoUrlByName,
  getShopNameFromDomain,
} from "../../utils/shop.util";

test("mapping should return image url", () => {
  expect(getShopLogoUrlByName("cArrefOUr.be")).toBeDefined();
});

test("mapping should return color", () => {
  expect(getShopDominantColorByName("cArrefOUr.be")).toBeDefined();
});

test("get shop name from domain should be correct", () => {
  expect(getShopNameFromDomain("carrefour.be")).toBe("carrefour");
});
