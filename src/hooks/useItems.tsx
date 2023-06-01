import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
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
    noResults: boolean
}>({
    items: [],
    filter: "",
    loading: false,
    setFilter: () => {
    },
    potentialItems: 0,
    noResults: false
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
    const [typing, setTyping] = useState(false)

    useEffect(() => {
        setTyping(false)
    }, [value])

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
        } catch (e: any) {
            console.log("Error: ", e)
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

    const noResults = useMemo(() => items.length === 0 && filter.length > 0 && !typing, [typing, items.length, filter.length])

    function setFilterHandler(val: string) {
        if (!typing) setTyping(true)
        setFilter(val)
    }

    return <ItemContext.Provider
        value={{items, filter, setFilter: setFilterHandler, loading, potentialItems, noResults}}>
        {props.children}
    </ItemContext.Provider>
}

function isValidFilter(val: string) {
    return val.length >= 3;
}
