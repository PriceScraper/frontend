import Recipe from "../../models/Recipe";
import RecipeCard from "./RecipeCard";
import {Box, Typography} from "@mui/material";
import NewRecipeButton from "./NewRecipeButton";

export default function RecipesSection({title, recipes, alwaysDisplay = false, newButton = false}: {
    title: string,
    recipes: Recipe[],
    alwaysDisplay?: boolean,
    newButton?: boolean
}) {
    if (!alwaysDisplay && recipes.length === 0) return <></>
    return <Box sx={{mb: 1, mt: 3}}>
        <Typography variant={"h5"} sx={{mb: 1}}>{title}</Typography>
        <div className={"flexElements"}>
            {newButton && <NewRecipeButton/>}
            {recipes.map(recipe => <RecipeCard key={`${title}+${recipe.id}`} recipe={recipe}/>)}
        </div>
    </Box>
}