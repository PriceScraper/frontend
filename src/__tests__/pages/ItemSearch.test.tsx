import {render} from "@testing-library/react";
import ItemSearch, {FailedToFindItemsForSearch} from "../../pages/items/ItemSearch";
import {ItemProvider} from "../../hooks/useItems";
import {MemoryRouter} from "react-router-dom";

test("Page renders", () => {
    render(<MemoryRouter><ItemProvider><ItemSearch/></ItemProvider></MemoryRouter>);
});

test("FailedToFindItemsForSearch renders", () => {
    render(<FailedToFindItemsForSearch/>);
});
