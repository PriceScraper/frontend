import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import RecipesSection from "../../../components/recipe/RecipesSection";
import {testRecipe} from "../../../constants";

test("renders", () => {
    const title = "testingSection"

    render(
        <MemoryRouter><RecipesSection title={title} recipes={[testRecipe]} newButton={true}
                                      alwaysDisplay={false}/></MemoryRouter>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(testRecipe.title)).toBeInTheDocument();
    expect(screen.getByText(`Gemaakt door ${testRecipe.creator.username}`)).toBeInTheDocument();
    expect(screen.getByText(`Nieuw recept`)).toBeInTheDocument();
});


test("renders without button", () => {
    const title = "testingSection"

    render(
        <MemoryRouter><RecipesSection title={title} recipes={[testRecipe]} newButton={false}
                                      alwaysDisplay={false}/></MemoryRouter>
    );
    expect(screen.queryByText(`Nieuw recept`)).toBeNull();
});


test("does not display anything", () => {
    const title = "testingSection"

    render(
        <MemoryRouter><RecipesSection title={title} recipes={[]} newButton={false}
                                      alwaysDisplay={false}/></MemoryRouter>
    );
    expect(screen.queryByText(title)).toBeNull();
});
