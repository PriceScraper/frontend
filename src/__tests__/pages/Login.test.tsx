import {render} from "@testing-library/react";
import Login from "../../pages/auth/Login";
import {MemoryRouter} from "react-router-dom";

test("Login renders", () => {
  render(<MemoryRouter><Login/></MemoryRouter>);
});
