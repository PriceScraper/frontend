import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ModifyRecipe, {LoadingArea, SearchArea} from "../../../pages/recipe/ModifyRecipe";

test("renders", () => {
    render(
        <MemoryRouter initialEntries={["/recipes/1/modify"]}><ModifyRecipe/></MemoryRouter>
    );

    expect(screen.getByText("Error 404")).toBeInTheDocument();
});

test("render loading area", () => {
    render(<LoadingArea/>)
})

test("render search area", () => {
    render(<SearchArea
        setRecipe={() => {
        }}
        recipe={{id: 1, title: "", items: null, creator: {id: 1, username: ""}}}
    />)
})
