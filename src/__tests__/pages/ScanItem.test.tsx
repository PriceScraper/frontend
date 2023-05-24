import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ScanItem from "../../pages/items/ScanItem";
import {SnackbarProvider} from "notistack";

test("renders", () => {
    render(<SnackbarProvider><MemoryRouter><ScanItem/></MemoryRouter></SnackbarProvider>);
});
