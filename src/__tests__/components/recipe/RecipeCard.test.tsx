import {render, screen} from "@testing-library/react";
import RecipeCard from "../../../components/recipe/RecipeCard";
import {MemoryRouter} from "react-router-dom";
import {testRecipe} from "../../../constants";

test("renders", () => {
    render(
        <MemoryRouter><RecipeCard recipe={testRecipe}/></MemoryRouter>
    );
    expect(screen.getByText(testRecipe.title)).toBeInTheDocument();
    expect(screen.getByText(`Gemaakt door ${testRecipe.creator.username}`)).toBeInTheDocument();
});
