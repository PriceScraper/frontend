import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {testItem, testRecipe} from "../../../constants";
import RecipeItemCard from "../../../components/recipe/modify/RecipeItemCard";

test("renders view card", () => {
    render(
        <MemoryRouter><RecipeItemCard recipe={null} setRecipe={() => {
        }} recipeItem={{id: 1, quantity: 2, item: testItem}}/></MemoryRouter>
    );
    expect(screen.getByText(testItem.name)).toBeInTheDocument();
});

test("renders edit card", () => {
    render(
        <MemoryRouter><RecipeItemCard recipe={testRecipe} setRecipe={() => {
        }} recipeItem={{id: 1, quantity: 67, item: testItem}}/></MemoryRouter>
    );
    expect(screen.getByText(67)).toBeInTheDocument();
});
