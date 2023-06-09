import { render, screen } from "@testing-library/react";
import { testShoppingList } from "../../constants";
import ShoppingListCard from "../../components/layout/shoppinglists/ShoppingListCard";

test("renders ShoppingListCard with shopping list", () => {
  const fakeShoppingList = testShoppingList;
  render(
    <ShoppingListCard
      whiteListedShops={["aldi", "carrefour"]}
      listNumber={1}
      shoppingList={fakeShoppingList}
    />
  );
  expect(screen.getByText(fakeShoppingList.title)).toBeInTheDocument();
});
