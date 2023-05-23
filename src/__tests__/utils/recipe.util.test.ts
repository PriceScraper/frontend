import {isInvalidRecipeId, isRecipeFromCreator} from "../../utils/recipe.util";
import {testRecipe} from "../../constants";

test("isRecipeFromCreator true", () => {
    expect(isRecipeFromCreator(testRecipe, testRecipe.creator.id)).toBeTruthy();
});
test("isRecipeFromCreator false", () => {
    expect(isRecipeFromCreator(testRecipe, testRecipe.creator.id + 1)).toBeFalsy();
});
test("isInvalidRecipeId valid", () => {
    expect(isInvalidRecipeId("1")).toBeFalsy();
    expect(isInvalidRecipeId("578")).toBeFalsy();
    expect(isInvalidRecipeId("57815648")).toBeFalsy();
    expect(isInvalidRecipeId("1e10000")).toBeFalsy(); // (This translates to Infinity, which is a number)
});
test("isInvalidRecipeId invalid", () => {
    expect(isInvalidRecipeId(undefined)).toBeTruthy();
    expect(isInvalidRecipeId("foo")).toBeTruthy();
    expect(isInvalidRecipeId("%20")).toBeTruthy();
});
