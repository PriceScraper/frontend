import {render} from "@testing-library/react";
import {testRecipe} from "../../../constants";
import AddItemsToRecipe from "../../../components/recipe/modify/AddItemsToRecipe";
import {ItemProvider} from "../../../hooks/useItems";

test("renders", () => {
    render(
        <ItemProvider><AddItemsToRecipe recipe={testRecipe} setRecipe={() => {
        }}/></ItemProvider>
    );
});
