import {
  getShopDominantColorByName,
  getShopLogoUrlByName,
} from "../../utils/shop.util";

test("mapping should return image url", () => {
  expect(getShopLogoUrlByName("cArrefOUr.be")).toBeDefined();
});

test("mapping should return color", () => {
  expect(getShopDominantColorByName("cArrefOUr.be")).toBeDefined();
});
