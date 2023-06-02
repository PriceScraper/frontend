import {act, render, screen} from "@testing-library/react";
import ShoppingListItemCheckBox, {
    anyCheckedInShoppingList,
    getKeyValue,
    isChecked,
    uncheckAllFromShoppingList
} from "../../../components/layout/shoppinglists/ShoppingListItemCheckBox";

test("checkbox", () => {
    const listId = 0
    const itemId = 0
    render(<ShoppingListItemCheckBox listId={listId} itemId={itemId} value={true}/>)

    const elements = screen.getAllByTestId(`DATA_${getKeyValue({listId, itemId})}`)
    expect(elements.length)
        .toBe(1)
    const checkbox = elements[0]

    expect(isChecked({itemId, listId}))
        .toBe(false)
    expect(anyCheckedInShoppingList(listId))
        .toBe(false)

    act(() => {
        checkbox.click()
    })
    expect(isChecked({itemId, listId}))
        .toBe(true)
    expect(anyCheckedInShoppingList(listId))
        .toBe(true)

    act(() => {
        uncheckAllFromShoppingList(listId)
    })
    expect(isChecked({itemId, listId}))
        .toBe(false)
    expect(anyCheckedInShoppingList(listId))
        .toBe(false)
})
