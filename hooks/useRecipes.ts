"use client";

import { useState, useCallback, useRef } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { Recipe, Filters } from "@/types/types";

type FetchParams = {
  query?: string;
  filters?: Filters;
  isPopular?: boolean;
};

export function useRecipes() {
  const { fetchData, loading, error } = useFetch<{ results: Recipe[] }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    cuisine: "",
    diet: "",
    intolerances: "",
    maxReadyTime: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  // ✅ Cache for previously fetched results
  const cacheRef = useRef<Record<string, Recipe[] | "__ERROR__">>({});

  const fetchRecipes = useCallback(
    async ({ query = "", filters, isPopular = false }: FetchParams) => {
      let endpoint = "recipes";

      if (isPopular) {
        endpoint = "recipes?number=10";
      } else {
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        if (filters?.cuisine) params.append("cuisine", filters.cuisine);
        if (filters?.diet) params.append("diet", filters.diet);
        if (filters?.intolerances)
          params.append("intolerances", filters.intolerances);
        if (filters?.maxReadyTime)
          params.append("maxReadyTime", filters.maxReadyTime);
        params.append("number", "10");
        params.append("addRecipeInformation", "true");

        endpoint = `recipes?${params.toString()}`;
      }

      // ✅ Use cache if data was already fetched
      if (cacheRef.current[endpoint]) {
        const cached = cacheRef.current[endpoint];
        if (cached === "__ERROR__") {
          setRecipes([]);
          setLocalError("No recipes found or server error (cached).");
          return;
        }
        setRecipes(cached as Recipe[]);
        setLocalError(null);
        return;
      }

      try {
        const data = await fetchData(endpoint);

        if (Array.isArray(data.results)) {
          setRecipes(data.results);
          cacheRef.current[endpoint] = data.results;
          setLocalError(null);
        } else {
          setRecipes([]);
          cacheRef.current[endpoint] = "__ERROR__";
          setLocalError("No recipes found or server error.");
        }
      } catch {
        setRecipes([]);
        cacheRef.current[endpoint] = "__ERROR__";
        setLocalError("Failed to fetch recipes: API limit or server error.");
      }
    },
    [fetchData]
  );

  const handleSearch = useCallback(() => {
    fetchRecipes({ query, filters });
  }, [query, filters, fetchRecipes]);

  function resetFilters() {
    setQuery("");
    setFilters({ cuisine: "", diet: "", intolerances: "", maxReadyTime: "" });
    setRecipes([]);
  }

  return {
    recipes,
    query,
    setQuery,
    filters,
    setFilters,
    handleSearch,
    resetFilters,
    loading,
    error: error || localError,
  };
}
