import {MemoryRouter} from "react-router-dom";
import SearchBar from "../../components/search/SearchBar";
import {ItemProvider} from "../../hooks/useItems";
import userEvent from "@testing-library/user-event";
import {act, render, screen, waitFor} from "@testing-library/react";
import {testItem} from "../../constants";
import axios from "axios";

jest.mock('jest.mock(\'axios\');');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("renders SearchArea withno search results", async () => {
    const fakeProduct = testItem;
    render(
        <MemoryRouter>
            <ItemProvider>
                <SearchBar/>
            </ItemProvider>
        </MemoryRouter>
    );

    mockedAxios.get.mockResolvedValue({
        data: [
            fakeProduct
        ],
    })

    const input = screen.getByTestId("search");
    act(() => userEvent.type(input, fakeProduct.name));
    await waitFor(() => expect(screen.getByText("We hebben het niet kunnen vinden!")).toBeInTheDocument());
});
