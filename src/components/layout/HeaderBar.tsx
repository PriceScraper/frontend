import "../../style/Search.scss";
import "../../style/HeaderBar.scss";
import {IconButton, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import SearchBar from "../search/SearchBar";
import CropFreeIcon from "@mui/icons-material/CropFree";

export default function HeaderBar() {
    return (
        <div className={"header-bar"}>
            <div className={"search-area"}>
                <SearchBar/>
            </div>
            <div className={"action-area"}>
                <Link to={"/item/scan"}>
                    <Tooltip title={"Scan barcode"}>
                        <IconButton
                            color="primary"
                            aria-label="shopping lists"
                            size={"large"}
                        >
                            <CropFreeIcon/>
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
        </div>
    );
}
