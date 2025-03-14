"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { Recipe } from "@/types/types";
import { useParams } from "next/navigation";

type FetchedRecipeContextType = {
  recipe?: Recipe;
  loading: boolean;
  error?: string;
};

const FetchedRecipeContext = createContext<
  FetchedRecipeContextType | undefined
>(undefined);

export function FetchedRecipeProvider({ children }: { children: ReactNode }) {
  const params = useParams<{ id: string }>();

  const { recipe, loading, error } = useRecipeDetails(params?.id ?? "");

  return (
    <FetchedRecipeContext.Provider value={{ recipe, loading, error }}>
      {children}
    </FetchedRecipeContext.Provider>
  );
}

export function useFetchedRecipe() {
  const context = useContext(FetchedRecipeContext);
  if (!context) {
    throw new Error(
      "useFetchedRecipe must be used within a FetchedRecipeProvider"
    );
  }
  return context;
}
