import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { useState } from "react";
import "../../style/Search.scss";
import { ItemSearchDto } from "../../models/dtos/ItemSearchDto";

interface SearchAreaProps {
  searchItemsHandler: (name: string) => Promise<ItemSearchDto[]>;
  cooldownInMillis?: number;
}
let keyCounter = 0
export default function SearchArea({
  searchItemsHandler,
  cooldownInMillis = 3000,
}: SearchAreaProps) {
  const [searchResults, setSearchResults] = useState<ItemSearchDto[]>();
  const [isOnSearchCooldown, setIsOnSearchCooldown] = useState<boolean>();

  return (
    <>
      <SearchBar
        searchHandler={async (name) => {
          if (name !== "" && isOnSearchCooldown) return;
          setSearchResults(await searchItemsHandler(name));
          setIsOnSearchCooldown(true);
          setTimeout(() => setIsOnSearchCooldown(false), cooldownInMillis);
        }}
      />
      <div className={"search-results"}>
        {searchResults?.map((i) => (
          <SearchResult key={keyCounter++} item={i} />
        ))}
      </div>
    </>
  );
}
