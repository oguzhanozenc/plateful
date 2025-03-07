"use client";

import { useState, useCallback, useRef } from "react";
import { getRecipes } from "@/lib/getRecipes";
import type { Recipe, Filters } from "@/types/types";

type FetchParams = {
  query?: string;
  filters?: Filters;
};

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    cuisine: "",
    diet: "",
    intolerances: "",
    maxReadyTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Cache to prevent unnecessary re-fetching
  const cacheRef = useRef<Record<string, Recipe[] | null>>({});

  const fetchRecipes = useCallback(
    async ({ query = "", filters = {} as Filters }: FetchParams) => {
      setLoading(true);
      setError(null);

      const params: Record<string, string> = { number: "10" };
      if (query) params.query = query;
      if (filters.cuisine) params.cuisine = filters.cuisine;
      if (filters.diet) params.diet = filters.diet;
      if (filters.intolerances) params.intolerances = filters.intolerances;
      if (filters.maxReadyTime) params.maxReadyTime = filters.maxReadyTime;

      const cacheKey = JSON.stringify(params);

      // ✅ Fetch fresh results when query/filters change
      if (cacheRef.current[cacheKey] !== undefined) {
        console.log("♻️ Using cached data.");
        setRecipes(cacheRef.current[cacheKey] || []);
        setLoading(false);
        return;
      }

      console.log("🔍 Fetching fresh results from API...");
      let retries = 2;

      while (retries > 0) {
        try {
          const data = await getRecipes(params);

          if (!Array.isArray(data)) {
            throw new Error("Invalid API response.");
          }

          if (data.length === 0) {
            setRecipes([]);
            cacheRef.current[cacheKey] = [];
            setError(null);
            break;
          }

          setRecipes(data);
          cacheRef.current[cacheKey] = data;
          setError(null);
          return;
        } catch (err) {
          retries--;

          // Handle API rate limit (429 error)
          if (err instanceof Error && err.message.includes("429")) {
            setError("API rate limit exceeded. Please try again later.");
            break;
          }

          // If out of retries, mark failure (without caching permanent errors)
          if (retries === 0) {
            setRecipes([]);
            setError("Failed to fetch recipes. Please try again later.");
          }
        }
      }
      setLoading(false);
    },
    []
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
    error,
  };
}
