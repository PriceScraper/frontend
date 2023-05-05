import {render} from "@testing-library/react";
import ItemSearch, {FailedToFindItemsForSearch, LoadingResults} from "../../pages/items/ItemSearch";

test("Page renders", () => {
    render(<ItemSearch/>);
});

test("FailedToFindItemsForSearch renders", () => {
    render(<FailedToFindItemsForSearch/>);
});


test("LoadingResults renders", () => {
    render(<LoadingResults/>);
});
