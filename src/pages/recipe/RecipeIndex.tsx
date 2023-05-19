import MainContainer from "../../components/layout/MainContainer";
import {TextField} from "@mui/material";
import useRecipes from "../../hooks/useRecipes";
import RecipesSection from "../../components/recipe/RecipesSection";
import {isRecipeFromCreator} from "../../utils/recipe.util";
import useAuth from "../../hooks/useAuth";

export default function RecipeIndex() {
    const {user, isAuthenticated} = useAuth()
    const {filter, setFilter, recipes} = useRecipes()

    return <MainContainer backTrackableTo={"/"} headerMsg={"Recepten"}>
        <TextField
            placeholder={"Zoek recept"}
            variant={"standard"}
            fullWidth
            value={filter}
            onChange={e => setFilter(e.target.value ?? "")}
        />
        {isAuthenticated && user !== null
            && <RecipesSection
                title={"Mijn recepten"}
                recipes={recipes.filter(e => isRecipeFromCreator(e, user.id))}
                alwaysDisplay={true}
                newButton={true}
            />}
        <RecipesSection
            title={"Publieke recepten"}
            recipes={recipes.filter(e => user === null ? true : !isRecipeFromCreator(e, user.id))}
        />
    </MainContainer>
}