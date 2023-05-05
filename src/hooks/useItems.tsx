import React, {createContext, useContext, useEffect, useState} from "react";
import {useDebounce} from 'use-debounce';
import {Item} from "../models/Item";
import axios from "axios";

const ItemContext = createContext<{
    items: Item[]
    filter: String
    loading: boolean
    setFilter: (e: string) => void
}>({
    items: [],
    filter: "",
    loading: false,
    setFilter: () => {
    }
})

export default function useItems() {
    return useContext(ItemContext)
}

export function ItemProvider(props: { children: React.ReactNode }) {
    const [items, setItems] = useState<Item[]>([])
    const [filter, setFilter] = useState('');
    const [value] = useDebounce(filter, 500);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            if (isValidFilter(value)) {
                setLoading(true)
                setItems([])
                axios
                    .get<Item[]>(`/items?name=${value}`)
                    .then(res => {
                        setItems(res.data)
                        setLoading(false)
                    })
                    .catch(err => console.log(err))
            } else setItems([])
        } catch {
            setLoading(false)
        }
    }, [value])

    return <ItemContext.Provider value={{items, filter, setFilter, loading}}>
        {props.children}
    </ItemContext.Provider>
}

function isValidFilter(val: string) {
    return val.length >= 3;
}
