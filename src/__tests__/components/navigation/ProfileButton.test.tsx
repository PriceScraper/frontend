import {render, screen} from "@testing-library/react";
import ProfileButton, {AvatarIcon} from "../../../components/navigation/TopNav/ProfileButton";

test("renders profile button", async () => {
    render(<ProfileButton/>);
});

test("renders profile icon", async () => {
    render(<AvatarIcon avatar={null}/>);
    let profilePic = await screen.findAllByText("??")
    expect(profilePic.length).toBe(1)
});
