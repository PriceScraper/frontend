import { Item } from "../../models/Item";
import "../../style/Search.scss";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

interface SearchResultProps {
  item: Item;
}

export default function SearchResult({ item }: SearchResultProps) {
  return (
    <Link to={"/product/" + item.id}>
      <Grid2 container spacing={2} className={"search-result-container"}>
        <Grid2 xs={4}>
          <img src={item.image} alt={"product"} />
        </Grid2>
        <Grid2 xs={8}>
          <div>{item.name}</div>
        </Grid2>
      </Grid2>
    </Link>
  );
}
