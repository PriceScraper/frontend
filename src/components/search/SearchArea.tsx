import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { useState } from "react";
import { Product } from "../../models/Product";
import "../../style/Search.scss";

interface SearchAreaProps {
  searchProductsHandler: (name: string) => Product[];
}

export default function SearchArea({ searchProductsHandler }: SearchAreaProps) {
  const [searchResults, setSearchResults] = useState<Product[] | null>();

  return (
    <>
      <SearchBar
        searchHandler={(name) => setSearchResults(searchProductsHandler(name))}
      />
      <div className={"search-results"}>
        {searchResults?.map((p, i) => (
          <SearchResult key={i} product={p} />
        ))}
      </div>
    </>
  );
}
