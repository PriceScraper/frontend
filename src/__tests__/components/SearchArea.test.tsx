import { act, render, screen, waitFor } from "@testing-library/react";
import SearchArea from "../../components/search/SearchArea";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { testItem } from "../../constants";

test("renders SearchArea with a search result", async () => {
  const fakeProduct = testItem;
  render(
    <MemoryRouter>
      <SearchArea
        searchItemsHandler={(a: string) => {
          return Promise.resolve([
            { id: 1, name: fakeProduct.name, image: fakeProduct.image },
          ]);
        }}
      />
    </MemoryRouter>
  );

  const input = screen.getByTestId("search");
  act(() => userEvent.type(input, "abc"));
  await waitFor(() =>
    expect(screen.getByText(fakeProduct.name)).toBeInTheDocument()
  );
});
