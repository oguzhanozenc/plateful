"use client";

import { useState, useEffect, useRef } from "react";
import type { Recipe } from "@/types/types";

export function useRecipeDetails(recipeId?: string) {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  // ✅ Cache recipe details
  const cacheRef = useRef<Record<string, Recipe | "__ERROR__">>({});

  useEffect(() => {
    if (!recipeId || isNaN(Number(recipeId))) {
      setError("Invalid recipe ID.");
      setLoading(false);
      return;
    }

    // ✅ Ensure recipeId is a valid string before accessing cache
    const validRecipeId = recipeId ?? "";

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

    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/recipes/${validRecipeId}`);
        if (!res.ok) throw new Error(`Failed to fetch recipe: ${res.status}`);
        const data: Recipe = await res.json();

        cacheRef.current[validRecipeId] = data;
        setRecipe(data);
        setError(undefined);
      } catch (err: unknown) {
        cacheRef.current[validRecipeId] = "__ERROR__";
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  return { recipe, loading, error };
}
