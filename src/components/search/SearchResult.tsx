import "../../style/Search.scss";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";
import {ItemSearchDto} from "../../models/dtos/ItemSearchDto";
import {Skeleton} from "@mui/material";
import useItems from "../../hooks/useItems";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface SearchResultProps {
    item: ItemSearchDto;
}

const itemNamePadding = 1
const itemResultStyling = {my: 0.001}
export default function SearchResult({item}: SearchResultProps) {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate("/product/" + item.id)} style={{cursor: "pointer"}}>
            <Grid2 container spacing={2} className={"search-result-container"} sx={itemResultStyling}>
                <Grid2 xs={4}>
                    {item.image?.includes("https") ? <img src={item.image} alt={"product"}/> : <LoadingImg/>}
                </Grid2>
                <Grid2 xs={8} sx={{p: itemNamePadding}}>
                    <div>{item.name}</div>
                </Grid2>
            </Grid2>
        </div>
    );
}

export function SearchResultsLoading() {
    return (
        <div style={{cursor: "pointer"}}>
            <Grid2 container spacing={2} className={"search-result-container"} sx={itemResultStyling}>
                <Grid2 xs={4}>
                    <LoadingImg/>
                </Grid2>
                <Grid2 xs={8} sx={{p: itemNamePadding}}>
                    <div>We zijn ze aan het zoeken...</div>
                </Grid2>
            </Grid2>
        </div>
    );
}

export function SeeAllResults() {
    const {filter} = useItems()
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/items/search`)} style={{cursor: "pointer"}}>
            <Grid2 container spacing={2} className={"search-result-container"} sx={itemResultStyling}>
                <Grid2 xs={4} sx={{textAlign: "center"}}>
                    <MoreHorizIcon sx={{fontSize: 35, position: "relative", top: -5}}/>
                </Grid2>
                <Grid2 xs={8} sx={{p: itemNamePadding}}>
                    <div>Zie alle resultaten</div>
                </Grid2>
            </Grid2>
        </div>
    );
}

function LoadingImg() {
    return <Skeleton sx={{height: 30}}/>
}
