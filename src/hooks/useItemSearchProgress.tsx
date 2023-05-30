import useItems from "./useItems";
import {useEffect, useState} from "react";
import {useIntervalInMs} from "./useInterval";

export default function useItemSearchProgress() {
    const {loading, potentialItems} = useItems()
    const [secondsProcessed, setSecondsProcessed] = useState(0)

    useIntervalInMs(() => {
        if (loading) setSecondsProcessed(secondsProcessed + 1)
    }, 1000)

    useEffect(() => {
        setSecondsProcessed(5)
    }, [potentialItems])

    if (!loading) return {progress: 100, potentialItems}

    const progress = potentialItems === 0
        ? 0
        : Math.min(100 * (secondsProcessed / (potentialItems * 0.6)), 100)
    return {progress, potentialItems}
}
