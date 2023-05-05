import "../../style/Search.scss";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";
import { ItemSearchDto } from "../../models/dtos/ItemSearchDto";
import {Skeleton} from "@mui/material";

interface SearchResultProps {
  item: ItemSearchDto;
}

export default function SearchResult({ item }: SearchResultProps) {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate("/product/" + item.id)} style={{cursor: "pointer"}}>
      <Grid2 container spacing={2} className={"search-result-container"}>
        <Grid2 xs={4}>
          {item.image.includes("https") ? <img src={item.image} alt={"product"}/> : <Skeleton />}
        </Grid2>
        <Grid2 xs={8}>
          <div>{item.name}</div>
        </Grid2>
      </Grid2>
    </div>
  );
}
