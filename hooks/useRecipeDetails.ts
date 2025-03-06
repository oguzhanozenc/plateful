"use client";

import { useState, useEffect, useRef } from "react";
import type { Recipe } from "@/types/types";

export function useRecipeDetails(recipeId?: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Cache recipe details
  const cacheRef = useRef<Record<string, Recipe | "__ERROR__">>({});

  useEffect(() => {
    if (!recipeId || isNaN(Number(recipeId))) {
      setError("Invalid recipe ID.");
      setLoading(false);
      return;
    }

    // ✅ Use cache if available
    if (cacheRef.current[recipeId]) {
      if (cacheRef.current[recipeId] === "__ERROR__") {
        setError("Failed to fetch recipe (cached).");
        setLoading(false);
        return;
      }
      setRecipe(cacheRef.current[recipeId] as Recipe);
      setLoading(false);
      return;
    }

    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/recipes/${recipeId}`);
        if (!res.ok) throw new Error(`Failed to fetch recipe: ${res.status}`);
        const data: Recipe = await res.json();

        cacheRef.current[recipeId] = data;
        setRecipe(data);
        setError(null);
      } catch (err: unknown) {
        cacheRef.current[recipeId] = "__ERROR__";
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
