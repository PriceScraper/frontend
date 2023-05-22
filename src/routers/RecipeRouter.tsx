import {Route, Routes} from "react-router-dom";
import RecipeIndex from "../pages/recipe/RecipeIndex";
import ModifyRecipe from "../pages/recipe/ModifyRecipe";
import Error404 from "../pages/errors/Error404";
import {RecipeProvider} from "../hooks/useRecipes";
import ViewRecipe from "../pages/recipe/ViewRecipe";

export default function RecipeRouter() {
    return <RecipeProvider>
        <Routes>
            <Route index element={<RecipeIndex/>}/>
            <Route path="/:recipeId/modify" element={<ModifyRecipe/>}/>
            <Route path="/:recipeId" element={<ViewRecipe/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    </RecipeProvider>
}
