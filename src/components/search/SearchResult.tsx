import { Product } from "../../models/Product";
import "../../style/Search.scss";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

interface SearchResultProps {
  product: Product;
}

export default function SearchResult({ product }: SearchResultProps) {
  return (
    <Link to={"/product/" + product.id}>
      <Grid2 container spacing={2} className={"search-result-container"}>
        <Grid2 xs={4}>
          <img src={product.img} alt={"product image"} />
        </Grid2>
        <Grid2 xs={8}>
          <div>{product.name}</div>
        </Grid2>
      </Grid2>
    </Link>
  );
}
