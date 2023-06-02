import {Checkbox} from "@mui/material";
import {useEffect, useState} from "react";

const PREFIX = "SHOPPINGLIST_ITEM_CHECKBOX"
const CHECKED_VALUE = "1"

export default function ShoppingListItemCheckBox({listId, itemId, value}: ListItemCheckBoxPropsWithValue) {
    const [checked, setChecked] = useState(isChecked({listId, itemId}))

    useEffect(() => {
        setChecked(isChecked({listId, itemId}))
    }, [value, itemId, listId])

    function handleClick() {
        setChecked(toggle({listId, itemId}))
    }

    return <Checkbox data-testid={`DATA_${getKeyValue({listId, itemId})}`}
                     className={value ? "refreshed" : ""}
                     checked={checked}
                     onClick={handleClick}/>
}

export function uncheckAllFromShoppingList(listId: number) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.startsWith(getKeyPrefix(listId))) {
            localStorage.removeItem(localStorage.key(i) ?? "")
        }
    }
}

export function anyCheckedInShoppingList(listId: number) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.startsWith(getKeyPrefix(listId))) {
            return true
        }
    }
    return false
}

function setListItemValue(props: ListItemCheckBoxPropsWithValue) {
    if (props.value)
        localStorage.setItem(getKeyValue(props), CHECKED_VALUE)
    else
        localStorage.removeItem(getKeyValue(props))
    return isChecked(props)
}

function toggle(props: ListItemCheckBoxProps) {
    setListItemValue({...props, value: !isChecked(props)})
    return isChecked(props)
}

export function isChecked(props: ListItemCheckBoxProps) {
    return localStorage.getItem(getKeyValue(props)) === CHECKED_VALUE
}

export function getKeyValue(props: ListItemCheckBoxProps) {
    return `${getKeyPrefix(props.listId)}${props.itemId}`
}

function getKeyPrefix(listId: number) {
    return `${PREFIX}_${listId}_`
}

interface ListItemCheckBoxProps {
    listId: number
    itemId: number
}


interface ListItemCheckBoxPropsWithValue {
    listId: number
    itemId: number
    value: boolean
}
