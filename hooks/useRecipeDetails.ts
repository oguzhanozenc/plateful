import { useState, useEffect, useRef } from "react";
import { getRecipeById } from "@/lib/getRecipes";
import type { Recipe } from "@/types/types";

export function useRecipeDetails(recipeId?: string) {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const cacheRef = useRef<Record<string, Recipe | "__ERROR__">>({});

  useEffect(() => {
    //  Handle cases where recipeId is temporarily undefined
    if (!recipeId) {
      setLoading(true); // Show loading state instead of error
      return;
    }

    // Ensure recipeId is a valid number
    if (isNaN(Number(recipeId))) {
      setError("Invalid recipe ID.");
      setLoading(false);
      return;
    }

    const validRecipeId = recipeId.trim();

    //  Check Cache First
    if (cacheRef.current[validRecipeId]) {
      if (cacheRef.current[validRecipeId] === "__ERROR__") {
        setError("Failed to fetch recipe (cached).");
        setLoading(false);
        return;
      }
      setRecipe(cacheRef.current[validRecipeId] as Recipe);
      setLoading(false);
      return;
    }

    async function fetchRecipe(retries = 3, delay = 500) {
      try {
        const data = await getRecipeById(validRecipeId);

        if (!data) throw new Error("Failed to fetch recipe");

        cacheRef.current[validRecipeId] = data;
        setRecipe(data);
        setError(undefined);
      } catch (err: unknown) {
        if (retries > 0) {
          console.warn(`Retrying fetch (${3 - retries + 1}/3)...`);
          setTimeout(() => fetchRecipe(retries - 1, delay * 2), delay);
          return;
        }

        cacheRef.current[validRecipeId] = "__ERROR__";

        if (err instanceof Error) {
          if (err.message.includes("429")) {
            setError("Too many requests. Please try again later.");
          } else {
            setError(err.message);
          }
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  return { recipe, loading, error };
}
