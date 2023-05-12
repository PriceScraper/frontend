import { render, screen } from "@testing-library/react";
import ProfileButton, {
  AvatarIcon,
} from "../../../components/navigation/TopNav/ProfileButton";
import { MemoryRouter } from "react-router-dom";

test("renders profile button", async () => {
  render(
    <MemoryRouter>
      <ProfileButton />
    </MemoryRouter>
  );
});

test("renders profile icon", async () => {
  render(<AvatarIcon avatar={null} />);
  let profilePic = await screen.findAllByText("??");
  expect(profilePic.length).toBe(1);
});
