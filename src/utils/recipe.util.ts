import Recipe from "../models/Recipe";

export function isRecipeFromCreator(recipe: Recipe, creatorId: number) {
    return recipe.creator.id === creatorId
}

export function isInvalidRecipeId(recipeIdAsString: string | undefined) {
    return recipeIdAsString === undefined || Number.isNaN(recipeIdAsString)
}