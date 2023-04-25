import { render, screen } from "@testing-library/react";
import { testShoppingList } from "../../constants";
import ShoppingListCard from "../../components/layout/ShoppingListCard";

test("renders ShoppingListCard with shopping list", () => {
  const fakeShoppingList = testShoppingList;
  render(<ShoppingListCard listNumber={1} shoppingList={fakeShoppingList} />);
  expect(screen.getByText(fakeShoppingList.title)).toBeInTheDocument();
});
