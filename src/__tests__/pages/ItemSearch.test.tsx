import { render } from "@testing-library/react";
import ItemSearch, {
  FailedToFindItemsForSearch,
} from "../../pages/items/ItemSearch";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { ItemProvider } from "../../hooks/useItems";

jest.mock("../../hooks/useItems", () => ({
  ...jest.requireActual("../../hooks/useItems"),
  __esModule: true,
  default: () => ({
    loading: true,
    items: [null],
    filter: "",
    noResults: false,
  }),
}));

test("Page renders", () => {
  render(
    <MemoryRouter>
      <ItemProvider>
        <ItemSearch />
      </ItemProvider>
    </MemoryRouter>
  );
});

test("FailedToFindItemsForSearch renders", () => {
  render(<FailedToFindItemsForSearch />);
});

test("loading items renders", () => {
  const doc = render(
    <MemoryRouter>
      <ItemProvider>
        <ItemSearch />
      </ItemProvider>
    </MemoryRouter>
  ).container;
  console.log(doc.children);
  const element = doc.querySelector("#items-loading");
  expect(element).toBeInTheDocument();
});
