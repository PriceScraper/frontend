import {Checkbox} from "@mui/material";
import {useState} from "react";

const PREFIX = "SHOPPINGLIST_ITEM_CHECKBOX"
const CHECKED_VALUE = "1"

export default function ShoppingListItemCheckBox({listId, itemId}: { listId: number, itemId: number }) {
    const [checked, setChecked] = useState(isChecked({listId, itemId}))

    function handleClick() {
        setChecked(toggle({listId, itemId}))
    }

    return <Checkbox checked={checked} onClick={handleClick}/>
}

function toggle(props: ListItemCheckBoxProps) {
    if (isChecked(props)) localStorage.removeItem(getKeyValue(props))
    else localStorage.setItem(getKeyValue(props), CHECKED_VALUE)
    return isChecked(props)
}

function isChecked(props: ListItemCheckBoxProps) {
    return localStorage.getItem(getKeyValue(props)) === CHECKED_VALUE
}

function getKeyValue(props: ListItemCheckBoxProps) {
    return `${PREFIX}_${props.listId}_${props.itemId}`
}

interface ListItemCheckBoxProps {
    listId: number
    itemId: number
}
