import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import MainRouter from "../../routers/MainRouter";

jest.setTimeout(15000)
test("logout page", async () => {
    render(<MemoryRouter initialEntries={["/logout"]}><MainRouter/></MemoryRouter>)
    await waitFor(() =>
        expect(screen.getAllByText("U bent succesvol uitgelogd!")[0]).toBeInTheDocument()
    )
    await waitFor(() =>
            expect(screen.getAllByText("Vind de laagste prijzen")[0]).toBeInTheDocument()
        , {timeout: 11000})
})
