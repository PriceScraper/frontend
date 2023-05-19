import {useNavigate, useParams} from "react-router-dom";
import Error404 from "../errors/Error404";
import {isInvalidRecipeId} from "../../utils/recipe.util";
import {useEffect, useState} from "react";
import Recipe from "../../models/Recipe";
import axios from "axios";
import {useSnackbar} from "notistack";
import RecipeItemCard from "../../components/recipe/view/RecipeItemCard";
import MainContainer from "../../components/layout/MainContainer";
import {Button} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import NewShoppingListFromRecipe from "../../components/recipe/view/NewShoppingListFromRecipe";
import AddRecipeToShoppingList from "../../components/recipe/view/AddRecipeToShoppingList";

export default function ViewRecipe() {
    const {recipeId} = useParams<{ recipeId: string | undefined }>()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const {user} = useAuth()

    useEffect(() => {
        if (!isInvalidRecipeId(recipeId)) {
            axios
                .get<Recipe>(`/recipe/${recipeId}`)
                .then(res => setRecipe(res.data))
                .catch(err => enqueueSnackbar(err.message, {variant: "error"}))
        }
    }, [recipeId, enqueueSnackbar])

    if (isInvalidRecipeId(recipeId)) return <Error404/>

    if (recipe === null || recipe.items === null) return <Error404/>

    return <MainContainer backTrackableTo={"/recipes"} headerMsg={recipe.title}>
        <div className={"flexElements spaceBetweenElements"}>
            <div>
                <NewShoppingListFromRecipe recipe={recipe}/>
                <AddRecipeToShoppingList recipe={recipe}/>
            </div>
            <div>
                {recipe.creator.id === user?.id &&
                    <Button color={"warning"} onClick={() => navigate(`/recipes/${recipeId}/modify`)}>Bewerk</Button>}
            </div>
        </div>
        {recipe.items.map(e => <RecipeItemCard key={e.id} recipeItem={e}/>)}
    </MainContainer>
}