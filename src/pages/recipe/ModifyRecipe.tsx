import Grid from "@mui/material/Grid";
import {CircularProgress, TextField} from "@mui/material";
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

export default function ModifyRecipe() {
    const {recipeId} = useParams<{ recipeId: string | undefined }>()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const {enqueueSnackbar} = useSnackbar()
    const {filter, setFilter, loading} = useItems()

    useEffect(() => {
        if (!isInvalidRecipeId(recipeId)) {
            axios
                .get<Recipe>(`/recipe/${recipeId}`)
                .then(res => setRecipe(res.data))
                .catch(err => enqueueSnackbar(err.message, {variant: "error"}))
        }
    }, [recipeId, enqueueSnackbar])

    if (isInvalidRecipeId(recipeId) || recipe === null) return <Error404/>

    return <Grid container>
        <Grid item md={8}>
            <h2 className={"main-msg"}>{recipe.title}</h2>
            <RecipeItems recipe={recipe} setRecipe={setRecipe}/>
        </Grid>
        <Grid item md={4}>
            <TextField disabled={loading} fullWidth variant={"standard"} label={"Zoek ingrediënt"} value={filter}
                       onChange={(e) => setFilter(e.target.value)}/>
            {!loading && <AddItemsToRecipe setRecipe={setRecipe} recipe={recipe}/>}
            {loading && <LoadingArea/>}
        </Grid>
    </Grid>
}

function LoadingArea() {
    return <div className={"flexElements centerElements"}>
        <CircularProgress sx={{m: 2}}/>
    </div>
}