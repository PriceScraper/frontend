import "../../style/Search.scss";
import "../../style/HeaderBar.scss";
import {IconButton} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {Link} from "react-router-dom";
import SearchBar from "../search/SearchBar";

export default function HeaderBar() {
  return (
    <div className={"header-bar"}>
      <div className={"search-area"}>
          <SearchBar/>
      </div>
      <div className={"action-area"}>
        <Link to={"/shopping-lists"}>
          <IconButton
            color="primary"
            aria-label="shopping lists"
            size={"large"}
          >
            <ListAltIcon />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
