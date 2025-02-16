import { useMemo } from "react";
import { Recipe } from "../types/types";

export function useRecommendedRecipes(
  recipes: Recipe[],
  selectedIngredients: string[],
  recentIngredients: string[]
): Recipe[] {
  return useMemo(() => {
    return recipes.filter((recipe) =>
      recipe.ingredients.some(
        (ing) =>
          selectedIngredients.includes(ing) || recentIngredients.includes(ing)
      )
    );
  }, [recipes, selectedIngredients, recentIngredients]);
}
