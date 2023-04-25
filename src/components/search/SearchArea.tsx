import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { useState } from "react";
import { Item } from "../../models/Item";
import "../../style/Search.scss";

interface SearchAreaProps {
  searchItemsHandler: (name: string) => Item[];
}

export default function SearchArea({ searchItemsHandler }: SearchAreaProps) {
  const [searchResults, setSearchResults] = useState<Item[] | null>();

  return (
    <>
      <SearchBar
        searchHandler={(name) => setSearchResults(searchItemsHandler(name))}
      />
      <div className={"search-results"}>
        {searchResults?.map((i) => (
          <SearchResult key={i.id} item={i} />
        ))}
      </div>
    </>
  );
}
