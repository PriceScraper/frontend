import {render} from "@testing-library/react";
import NewShoppingListFromRecipe from "../../../components/recipe/view/NewShoppingListFromRecipe";
import {testRecipe} from "../../../constants";

test("renders", () => {
    render(
        <NewShoppingListFromRecipe recipe={testRecipe}/>
    );
});
