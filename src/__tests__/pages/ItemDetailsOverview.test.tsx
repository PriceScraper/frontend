import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { testItem } from "../../constants";
import ItemDetailsOverview from "../../pages/items/ItemDetailsOverview";
import * as ItemService from "../../services/item.service";
import { QueryClient, QueryClientProvider } from "react-query";

test("renders item details overview", async () => {
  const mock = jest.spyOn(ItemService, "fetchItem");
  mock.mockReturnValue(Promise.resolve(testItem));
  const fakeProduct = testItem;
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route
            path={"/product/:itemId"}
            element={<ItemDetailsOverview />}
          ></Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
  await waitFor(() =>
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument()
  );
});
