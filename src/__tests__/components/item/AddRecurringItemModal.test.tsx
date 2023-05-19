import {act, render, screen} from "@testing-library/react";
import AddRecurringItemModal from "../../../components/item/AddRecurringItemModal";
import {testItem} from "../../../constants";

test("renders", async () => {
    render(<AddRecurringItemModal open={true} handleClose={() => {
    }} item={testItem}/>)
    let addValBtns = await screen.findAllByTestId("changeValueBtn1")
    let remValBtns = await screen.findAllByTestId("changeValueBtn-1")
    expect(addValBtns.length).toBe(1)
    expect(remValBtns.length).toBe(1)

    act(() => {
        addValBtns[0].click()
        remValBtns[0].click()
    })
})