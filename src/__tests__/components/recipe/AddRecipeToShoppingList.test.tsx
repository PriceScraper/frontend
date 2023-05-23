import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {testRecipe} from "../../../constants";
import AddRecipeToShoppingList from "../../../components/recipe/view/AddRecipeToShoppingList";
import {QueryClient, QueryClientProvider} from "react-query";

describe("mocking", () => {
    jest.mock('jest.mock(\'axios\');');
    jest.mock('axios');
})

test("renders", () => {
    render(
        <QueryClientProvider client={new QueryClient()}><MemoryRouter><AddRecipeToShoppingList
            recipe={testRecipe}/></MemoryRouter></QueryClientProvider>
    );
});
