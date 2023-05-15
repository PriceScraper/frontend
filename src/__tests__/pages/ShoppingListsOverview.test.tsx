import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { testShoppingList } from "../../constants";
import * as ShoppingListService from "../../services/shoppinglist.service";
import { QueryClient, QueryClientProvider } from "react-query";
import ShoppingListsOverview from "../../pages/shop/ShoppingListsOverview";

test("renders shopping lists overview", async () => {
  const mock = jest.spyOn(ShoppingListService, "fetchShoppingListForUser");
  jest.mock("../../hooks/useSettings", () => ({
    useSettings: () => ({ whiteListedShops: ["aldi", "carrefour"] }),
  }));
  mock.mockReturnValue(Promise.resolve([testShoppingList]));
  const fakeShoppingList = testShoppingList;
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={["/shopping-lists"]}>
        <Routes>
          <Route
            path={"/shopping-lists"}
            element={<ShoppingListsOverview />}
          ></Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
  await waitFor(() =>
    expect(screen.getAllByText(fakeShoppingList.title)[0]).toBeInTheDocument()
  );
});
