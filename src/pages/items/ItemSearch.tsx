import SearchBar from "../../components/search/SearchBar";
import {ItemSearchDto} from "../../models/dtos/ItemSearchDto";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import React from "react";
import useItems from "../../hooks/useItems";
import './../../style/flexElements.scss'
import noResultsImg from "../../img/noresults.png";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/layout/MainContainer";

export default function ItemSearch() {
    const {loading, items, filter} = useItems()

    const msg = items.length === 1
        ? <>We hebben {items.length} resultaat gevonden voor jouw zoekopdracht!</>
        : <>We hebben {items.length} resultaten gevonden voor jouw zoekopdracht!</>

    return <MainContainer backTrackableTo={"/"} headerMsg={"Zoeken"}>
        <SearchBar displayResults={false}/>
        <div>
            {loading && <LoadingResults/>}

            {!loading && items.length === 0 && filter.length >= 3
                && <FailedToFindItemsForSearch/>}
            {!loading && items.length === 0 && filter.length < 3
                && <>We kunnen pas producten voor u opzoeken wanneer u minstens 3 karakters ingevuld hebt!</>}

            {!loading && items.length > 0 && <>
                <Typography variant={"h6"} sx={{my: 2}}>{msg}</Typography>
                <Grid container spacing={2}>
                    {items.map(item => <Grid item xs={12} md={4}>
                        <ItemCard key={item.id} item={item}/>
                    </Grid>)}
                </Grid>
            </>}
        </div>
    </MainContainer>
}

function ItemCard(props: { item: ItemSearchDto }) {
    const navigate = useNavigate()

    return <Card sx={{width: "100%", cursor: "pointer"}} onClick={() => navigate(`/product/${props.item.id}`)}>
        <CardActionArea>
            <CardMedia
                sx={{height: 100, m: 1}}
                image={props.item.image}
                title={props.item.name}
            />
            <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {props.item.name}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
}

export function FailedToFindItemsForSearch() {
    return <div className={"flexElements centerElements"}>
        <div>
            <div className={"flexElements centerElements"}>
                <img src={noResultsImg} alt={"no results"} height={150} style={{margin: 30}}/>
            </div>
            <Typography>We konden dit product niet vinden in de rekken!</Typography>
        </div>
    </div>
}

export function LoadingResults() {
    return <div className={"flexElements centerElements"}>
        <div>
            <div className={"flexElements centerElements"}>
                <CircularProgress size={100} sx={{m: 3}}/>
            </div>
            <Typography>We zijn jouw zoekopdracht aan het verwerken!</Typography>
        </div>
    </div>
}
