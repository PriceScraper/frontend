import Recipe from "../../../models/Recipe";
import {Typography} from "@mui/material";
import RecipeItemCard from "./RecipeItemCard";

export default function RecipeItems({recipe, setRecipe}: { recipe: Recipe, setRecipe: (e: Recipe) => void }) {
    if (recipe.items === null || recipe.items.length === 0) return <Typography variant={"h5"}>Voeg hier de ingrediënten
        toe aan het recept!</Typography>

    return <div>
        {recipe.items.map(item => <RecipeItemCard key={item.id} recipeItem={item} recipe={recipe}
                                                  setRecipe={setRecipe}/>)}
    </div>
}
