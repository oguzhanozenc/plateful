"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { Recipe, Filters } from "@/types/types";

export function useRecipes() {
  const { fetchData, loading, error } = useFetch<Recipe[]>();

  // State for Recipes & Filters
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    cuisine: "",
    diet: "",
    intolerances: "",
    maxReadyTime: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  // Cache to Prevent Unnecessary API Calls
  const cacheRef = useRef<Record<string, Recipe[]> | null>(null);

  // Fetch Recipes (Search & Filters)
  const fetchRecipes = useCallback(
    async ({
      query = "",
      filters = { cuisine: "", diet: "", intolerances: "", maxReadyTime: "" },
      isPopular = false,
    }: {
      query?: string;
      filters?: Filters;
      isPopular?: boolean;
    }) => {
      console.log("📡 Fetching Recipes...", { query, filters });

      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (filters?.cuisine) params.append("cuisine", filters.cuisine);
      if (filters?.diet) params.append("diet", filters.diet);
      if (filters?.intolerances)
        params.append("intolerances", filters.intolerances);
      if (filters?.maxReadyTime)
        params.append("maxReadyTime", filters.maxReadyTime);
      params.append("number", "10");

      const endpoint = isPopular
        ? "recipes?number=10"
        : `recipes?${params.toString()}`;

      // Cache Check
      if (cacheRef.current && cacheRef.current[endpoint]) {
        console.log("⚡ Using Cached Data:", endpoint);
        setRecipes(cacheRef.current[endpoint]);
        return;
      }

      const data = await fetchData(endpoint);
      if (data && Array.isArray(data)) {
        setRecipes(data);
        if (cacheRef.current) {
          cacheRef.current[endpoint] = data;
        }
        setLocalError(null);
      } else {
        setRecipes([]);
        setLocalError("No recipes found.");
      }
    },
    [fetchData]
  );

  // Preload Popular Recipes on Mount
  useEffect(() => {
    fetchRecipes({ isPopular: true });
  }, []);

  // Auto-fetch when filters change
  useEffect(() => {
    fetchRecipes({ query, filters });
  }, [filters]);

  // Search Handler
  const handleSearch = () => {
    fetchRecipes({ query, filters });
  };

  // Apply Filters
  const handleFilterApply = () => {
    fetchRecipes({ query, filters });
  };

  //  Reset Search & Filters
  const resetFilters = () => {
    setQuery("");
    setFilters({ cuisine: "", diet: "", intolerances: "", maxReadyTime: "" });
    setRecipes(cacheRef.current?.["recipes?number=10"] || []);
  };

  return {
    recipes,
    query,
    setQuery,
    filters,
    setFilters,
    handleSearch,
    handleFilterApply,
    resetFilters,
    loading,
    error: error || localError,
  };
}
