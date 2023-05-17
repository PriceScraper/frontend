import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import AddToShoppingList from "../../../components/item/AddToShoppingList";
import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";

test("renders", () => {
    render(
        <MemoryRouter>
            <QueryClientProvider client={new QueryClient()}>
                <AddToShoppingList item={undefined}/>
            </QueryClientProvider>
        </MemoryRouter>
    );
});
