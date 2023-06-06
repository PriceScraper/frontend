import Grid from "@mui/material/Grid";
import {Box, CircularProgress, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Error404 from "../errors/Error404";
import RecipeItems from "../../components/recipe/modify/RecipeItems";
import {useEffect, useState} from "react";
import Recipe from "../../models/Recipe";
import axios from "axios";
import {useSnackbar} from "notistack";
import useItems from "../../hooks/useItems";
import AddItemsToRecipe from "../../components/recipe/modify/AddItemsToRecipe";
import {isInvalidRecipeId} from "../../utils/recipe.util";
import useItemSearchProgress from "../../hooks/useItemSearchProgress";
import usePreparedMediaQuery from "../../hooks/usePreparedMediaQuery";

export default function ModifyRecipe() {
    const {recipeId} = useParams<{ recipeId: string | undefined }>()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const {enqueueSnackbar} = useSnackbar()
    const {isBigScreen} = usePreparedMediaQuery()

    useEffect(() => {
        if (!isInvalidRecipeId(recipeId)) {
            axios
                .get<Recipe>(`/recipe/${recipeId}`)
                .then(res => setRecipe(res.data))
                .catch(err => enqueueSnackbar(err.message, {variant: "error"}))
        }
    }, [recipeId, enqueueSnackbar])

    if (isInvalidRecipeId(recipeId) || recipe === null) return <Error404/>

    return <>
        <h2 className={"main-msg"}>{recipe.title}</h2>
        <Grid container spacing={3}>
            {!isBigScreen && <SearchArea setRecipe={setRecipe} recipe={recipe}/>}
            <Grid item md={8}>
                <RecipeItems recipe={recipe} setRecipe={setRecipe}/>
            </Grid>
            {isBigScreen && <SearchArea setRecipe={setRecipe} recipe={recipe}/>}
        </Grid>
    </>
}

export function SearchArea(props: { setRecipe: (e: Recipe) => void, recipe: Recipe }) {
    const {filter, setFilter, loading, noResults} = useItems()
    const {isSmallScreen} = usePreparedMediaQuery()
    return <Grid item md={4} sx={isSmallScreen ? {width: "100%"} : {}}>
        <TextField fullWidth
                   variant={"standard"}
                   label={"Zoek ingrediënt"}
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                   error={!loading && noResults}
                   helperText={!loading && noResults ? "We konden niets vinden voor deze zoekopdracht!" : null}
        />
        {!loading && <AddItemsToRecipe setRecipe={props.setRecipe} recipe={props.recipe}/>}
        {loading && <LoadingArea/>}
    </Grid>
}

export function LoadingArea() {
    const {potentialItems, progress} = useItemSearchProgress()

    function processingProducts() {
        if (potentialItems === 0) return false
        return progress <= 99 && progress > 0
    }

    return <div>
        <div className={"flexElements centerElements"}>
            <Box sx={{position: 'relative', display: 'inline-flex', m: 2}}>
                <CircularProgress variant={processingProducts() ? "determinate" : "indeterminate"} value={progress}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {processingProducts() && <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >{`${Math.round(progress)}%`}</Typography>}
                </Box>
            </Box>
        </div>
        {potentialItems > 0 && <div className={"flexElements centerElements"}>
            {progress <= 99 &&
                <Typography variant={"subtitle2"}>We zijn {potentialItems} producten aan het bekijken!</Typography>}
            {progress > 99 && <Typography variant={"subtitle2"}>Ze komen er zo aan!</Typography>}
        </div>}
    </div>
}
