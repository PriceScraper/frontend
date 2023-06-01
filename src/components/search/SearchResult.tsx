import "../../style/Search.scss";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";
import {ItemSearchDto} from "../../models/dtos/ItemSearchDto";
import {Box, Skeleton, useMediaQuery} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
import useItemSearchProgress from "../../hooks/useItemSearchProgress";
import noResultsImg from "./../../img/noresults.png"

interface SearchResultProps {
    item: ItemSearchDto;
}

const mediaQueryBigScreen = "(min-width: 1000px)"

export default function SearchResult({item}: SearchResultProps) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/item/" + item.id)}
            style={{
                cursor: "pointer",
                paddingTop: "0.2rem",
                paddingBottom: "0.2rem",
            }}
        >
            <Box
                className={"search-result-container"}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    overflow: "hidden",
                    height: 50,
                }}
            >
                {item.image?.includes("http") ? (
                    <img src={item.image} alt={"product"}/>
                ) : (
                    <LoadingImg/>
                )}

                <Typography sx={{fontSize: "1rem"}}>{item.name}</Typography>
            </Box>
        </div>
    );
}

export function SearchResultsLoading() {
    const {progress, potentialItems} = useItemSearchProgress()
    const bigScreen = useMediaQuery(mediaQueryBigScreen)

    return (
        <div style={{cursor: "pointer", background: "white"}}>
            <Grid2 container spacing={2} className={"search-result-container"}>
                {bigScreen && <Grid2 xs={4}>
                    <LoadingImg/>
                </Grid2>}
                <Grid2 xs={bigScreen ? 8 : 12} sx={{p: 1}}>
                    {potentialItems === 0
                        ? <div>We zijn ze aan het zoeken...</div>
                        : <div>
                            {bigScreen && <>We zijn er zo meteen!<br/></>}
                            <small>We zijn {potentialItems} potentiële items aan het bekijken!</small>
                            {progress > 0 && <LinearProgress variant="determinate" value={progress}/>}
                        </div>
                    }
                </Grid2>
            </Grid2>
        </div>
    );
}

export function NoSearchResults() {
    const bigScreen = useMediaQuery(mediaQueryBigScreen)
    return (
        <div style={{cursor: "pointer", background: "white"}}>
            <Grid2 container spacing={2} className={"search-result-container"}>
                <Grid2 xs={4}>
                    <img src={noResultsImg} alt={"no results"} style={{opacity: "70%", margin: 2}}/>
                </Grid2>
                <Grid2 xs={8} sx={{p: 1}}>
                    {bigScreen && <div style={{margin: 4}}>We hebben het niet kunnen vinden!</div>}
                    {!bigScreen && <small style={{margin: 4}}>We hebben het niet kunnen vinden!</small>}
                </Grid2>
            </Grid2>
        </div>
    );
}

export function SeeAllResults() {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/items/search`)}
            style={{cursor: "pointer"}}
        >
            <Box
                className={"search-result-container"}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    overflow: "hidden",
                    height: 50,
                }}
            >
                <div style={{width: "100%", display: "grid", justifyItems: "center"}}>
                    <MoreHorizIcon
                        sx={{maxWidth: 50, fontSize: 35, position: "relative", top: -5}}
                    />
                </div>

                <Typography sx={{fontSize: "1rem"}}>Zie alle resultaten</Typography>
            </Box>
        </div>
    );
}

function LoadingImg() {
    return <Skeleton sx={{height: 30}}/>;
}
