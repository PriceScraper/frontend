import {Collapse, FormControl, Input, InputAdornment} from "@mui/material";
import useItems from "../../hooks/useItems";
import SearchResult, {NoSearchResults, SearchResultsLoading, SeeAllResults,} from "./SearchResult";
import "../../style/Search.scss";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Divider from "@mui/material/Divider";
import { useSearchParams } from "react-router-dom";

export default function SearchBar({
                                      displayResults = true,
                                  }: {
    displayResults?: boolean;
}) {
    const {filter, setFilter, loading} = useItems();
    const [isFocused, setFocused] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get("q");
        if (searchQuery != null) {
            setFilter(searchQuery);
        }
    }, [searchParams]);

    return (
        <>
            <FormControl className={"search-bar"} variant={"standard"}>
                <Input
                    data-testid={"search"}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 100)}
                    fullWidth
                    sx={{p: 0.5, fontSize: 20}}
                    placeholder={"Zoek product"}
                    value={filter}
                    onChange={e => setFilter(e.target.value)
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            {loading ? <AutorenewIcon/> : <Search/>}
                        </InputAdornment>
                    }
                />
            </FormControl>
            {displayResults && <SearchResults isFocused={isFocused}/>}
        </>
    );
}

export function SearchResults({isFocused}: { isFocused: boolean }) {
    const {items, loading, noResults} = useItems();

    if (loading) return <div className={"search-results"}>
        <SearchResultsLoading/>
    </div>
    else if (noResults) return <div className={"search-results"}>
        <NoSearchResults/>
    </div>
    else if (items.length > 4) return <Collapse in={isFocused}>
        <div className={"search-results"}>
            {items.slice(0, 4).map((i) => (
                <div key={i.id}>
                    <SearchResult item={i}/>
                    <Divider/>
                </div>
            ))}
            {<SeeAllResults/>}
        </div>
    </Collapse>

    return (
        <Collapse in={isFocused}>
            <div className={"search-results"}>
                {items.map((i) => (
                    <div key={i.id}>
                        <SearchResult item={i}/>
                        <Divider/>
                    </div>
                ))}
            </div>
        </Collapse>
    );
}
