import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ModifyRecipe from "../../../pages/recipe/ModifyRecipe";

test("renders", () => {
    render(
        <MemoryRouter initialEntries={["/recipes/1/modify"]}><ModifyRecipe/></MemoryRouter>
    );

    expect(screen.getByText("Error 404")).toBeInTheDocument();
});
