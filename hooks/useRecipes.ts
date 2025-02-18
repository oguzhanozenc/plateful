"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import type { Recipe } from "@/types/types";

export function useRecipes() {
  const { data, loading, error, fetchData } = useFetch<Recipe[]>();
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState("Any");
  const [limit, setLimit] = useState("10");

  const handleSearch = () => {
    if (!query.trim()) return;
    fetchData("recipes", {
      ingredients: query,
      number: limit,
      diet: diet !== "Any" ? diet : "",
    });
  };

  return {
    query,
    setQuery,
    diet,
    setDiet,
    limit,
    setLimit,
    recipes: data || [],
    loading,
    error,
    handleSearch,
  };
}
