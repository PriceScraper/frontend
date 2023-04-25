import { act, render, screen } from "@testing-library/react";
import SearchArea from "../../components/search/SearchArea";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { testItem } from "../../constants";

test("renders SearchArea with a search result", () => {
  const fakeProduct = testItem;
  render(
    <MemoryRouter>
      <SearchArea
        searchItemsHandler={(a: string) => {
          return [fakeProduct];
        }}
      />
    </MemoryRouter>
  );

  const input = screen.getByTestId("search");
  act(() => userEvent.type(input, "abc"));
  const name = screen.getByText(fakeProduct.name);
  expect(name).toBeInTheDocument();
});
