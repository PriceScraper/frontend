import React, {createContext, useContext, useEffect, useState} from "react";
import {useDebounce} from 'use-debounce';
import {Item} from "../models/Item";
import axios from "axios";
import {useSnackbar} from "notistack";

const ItemContext = createContext<{
    items: Item[]
    filter: String
    loading: boolean
    setFilter: (e: string) => void,
    potentialItems: number
}>({
    items: [],
    filter: "",
    loading: false,
    setFilter: () => {
    },
    potentialItems: 0
})

export default function useItems() {
    return useContext(ItemContext)
}

export function ItemProvider(props: { children: React.ReactNode }) {
    const [items, setItems] = useState<Item[]>([])
    const [filter, setFilter] = useState('');
    const [value] = useDebounce(filter, 500);
    const [loading, setLoading] = useState(false)
    const [potentialItems, setPotentialItems] = useState(0)
    const {enqueueSnackbar} = useSnackbar()

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
                    .catch(err => {
                        enqueueSnackbar(err, {variant: "error"})
                    })
            } else {
                setItems([])
                if (value.length > 0 && value.length < 3)
                    enqueueSnackbar("Je moet minstens 3 karakters invullen voordat we beginnen te zoeken!", {variant: "info"})
            }
        } catch {
            setLoading(false)
        }
    }, [value, enqueueSnackbar])

    useEffect(() => {
        setPotentialItems(0)
        if (isValidFilter(value)) {
            setTimeout(() => {
                if (loading) {
                    axios
                        .get<{ count: number }>(`/items/potential?q=${value}`)
                        .then(res => {
                            setPotentialItems(res.data.count)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }, 4000)
        } else {
            setPotentialItems(0)
        }
    }, [value, loading])

    return <ItemContext.Provider value={{items, filter, setFilter, loading, potentialItems}}>
        {props.children}
    </ItemContext.Provider>
}

function isValidFilter(val: string) {
    return val.length >= 3;
}
