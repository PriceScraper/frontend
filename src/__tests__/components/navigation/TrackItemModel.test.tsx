import {queryByAttribute, render, screen} from "@testing-library/react";
import React from "react";
import TrackItemModalButton from "../../../components/navigation/TopNav/TrackItemModal";
import * as someName from "../../../hooks/useAuth";

jest.mock("../../../hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn(),
}));

beforeEach(() => {
    // Cache original functionality
    const realUseState = React.useState<unknown>
    jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => realUseState(true))
    jest.spyOn(someName, 'default')
        .mockImplementation(() => {
            return {
                isAuthenticated: true,
                token: "null",
                setToken: () => {
                },
                user: null
            }
        });
})

test("modal and button found", async () => {
    const view = render(<TrackItemModalButton/>)

    const getById = queryByAttribute.bind(null, 'id');
    const btn = getById(view.container, "trackItemModalButton")
    expect(btn !== null).toBeTruthy()

    let modals = await screen.findAllByRole("trackItemModal")
    expect(modals.length).toBe(1)
});
