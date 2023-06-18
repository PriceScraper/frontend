import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SettingsPage from "../../pages/settings/SettingsPage";

test("SettingsPage renders", () => {
  render(
    <MemoryRouter>
      <SettingsPage />
    </MemoryRouter>
  );
});
