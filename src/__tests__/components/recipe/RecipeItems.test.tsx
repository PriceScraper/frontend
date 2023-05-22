import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {testRecipe} from "../../../constants";
import RecipeItems from "../../../components/recipe/modify/RecipeItems";

test("renders", () => {
    render(
        <MemoryRouter><RecipeItems recipe={testRecipe} setRecipe={() => {
        }}/></MemoryRouter>
    );
    // @ts-ignore
    expect(screen.getByText(testRecipe.items[0].item.name)).toBeInTheDocument();
});

test("renders error message", () => {
    const recipe = testRecipe
    recipe.items = []
    render(
        <MemoryRouter><RecipeItems recipe={recipe} setRecipe={() => {
        }}/></MemoryRouter>
    );
    expect(screen.getByText("Voeg hier de ingrediënten toe aan het recept!")).toBeInTheDocument();
});
