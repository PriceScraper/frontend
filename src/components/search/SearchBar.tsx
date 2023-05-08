import {FormControl, Input, InputAdornment} from "@mui/material";
import useItems from "../../hooks/useItems";
import SearchResult, {SearchResultsLoading, SeeAllResults} from "./SearchResult";
import "../../style/Search.scss";
import {Search} from "@mui/icons-material";
import {useState} from "react";
import AutorenewIcon from '@mui/icons-material/Autorenew';

let keyCounter = 0
export default function SearchBar({displayResults = true}: { displayResults?: boolean }) {
    const {filter, setFilter, loading} = useItems()
    const [isFocused, setFocused] = useState(false)

    return <>
        <FormControl
            className={"search-bar"}
            variant={"standard"}>
            <Input
                data-testid={"search"}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 100)}
                fullWidth
                sx={{p: 0.5, fontSize: 20}}
                placeholder={"Zoek product"}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        {loading ? <AutorenewIcon/> : <Search/>}
                    </InputAdornment>
                }/>
        </FormControl>
        {displayResults && <SearchResults isFocused={isFocused}/>}
    </>
}

export function SearchResults({isFocused}: { isFocused: boolean }) {
    const {items, loading} = useItems()

    if (loading) return <div className={"search-results"}><SearchResultsLoading/></div>

    if (items.length > 4) return <div className={"search-results"}>
        {isFocused && items
            .slice(0, 4)
            .map((i) => (
                <SearchResult key={keyCounter++} item={i}/>
            ))}
        {isFocused && <SeeAllResults/>}
    </div>

    return <div className={"search-results"}>
        {isFocused && items
            .map((i) => (
                <SearchResult key={keyCounter++} item={i}/>
            ))}
    </div>
}
