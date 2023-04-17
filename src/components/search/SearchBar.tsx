import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  searchHandler: (productName: string) => void;
}

export default function SearchBar({ searchHandler }: SearchBarProps) {
  return (
    <FormControl className={"search-bar"} variant="standard">
      <InputLabel htmlFor="search">Zoek product</InputLabel>
      <Input
        onChange={(e) => {
          searchHandler(e.target.value);
        }}
        data-testid={"search"}
        id="search"
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
