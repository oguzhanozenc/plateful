"use client";

import { useState, useEffect, useCallback } from "react";
import { useRecipes } from "@/hooks/useRecipes";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { RecipeCard } from "@/app/components/RecipeCard";
import { RecipeCardSkeleton } from "@/app/components/RecipeCardSkeleton";
import { Filter, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Badge } from "@/ui/badge";
import { Separator } from "@/ui/separator";
import { ScrollArea } from "@/ui/scroll-area";
import type { Filters } from "@/types/types";
import Title from "@/app/components/Title";

export default function RecipeList() {
  const {
    recipes,
    query,
    setQuery,
    filters,
    setFilters,
    handleSearch,
    resetFilters,
    loading,
    error,
  } = useRecipes();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // ✅ Prevents unnecessary re-fetching
  const stableHandleSearch = useCallback(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    if (debouncedQuery.length >= 3 || debouncedQuery.length === 0) {
      stableHandleSearch();
    }
  }, [debouncedQuery, stableHandleSearch]);

  const filterOptions: Record<keyof Filters, string[]> = {
    cuisine: ["Italian", "Mexican", "Chinese", "Indian", "American"],
    diet: ["Vegan", "Vegetarian", "Ketogenic", "Paleo", "Pescatarian"],
    intolerances: ["Gluten", "Dairy", "Egg", "Nuts", "Shellfish"],
    maxReadyTime: ["15", "30", "60", "120"],
  };

  function toggleFilter(key: keyof Filters, option: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === option ? "" : option,
    }));
  }

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="mx-auto w-full max-w-4xl min-h-screen py-16 px-6 space-y-14">
      <header className="flex flex-col justify-self-center w-full">
        <Title>Discover Recipes</Title>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Plan your meals effortlessly with curated recipes.
        </p>

        <div className="flex gap-2  mt-6 relative items">
          <Input
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              className="absolute right-14 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400" />
            </Button>
          )}
          <Button onClick={stableHandleSearch} size="icon" className="ml-2 p-2">
            <Search className="w-5 h-5" />
          </Button>

          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 ml-2"
              >
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4 shadow-md">
              <h3 className="text-lg font-medium mb-2">Filters</h3>
              <ScrollArea className="max-h-64">
                {Object.entries(filterOptions).map(([key, options]) => (
                  <div key={key} className="mb-3">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <Badge
                          key={option}
                          variant={
                            filters[key as keyof Filters] === option
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            toggleFilter(key as keyof Filters, option)
                          }
                          className="cursor-pointer"
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <Separator className="my-3" />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={resetFilters}
                  className="w-full"
                  disabled={!hasActiveFilters && query === ""}
                >
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    setIsFilterOpen(false);
                    stableHandleSearch();
                  }}
                  className="w-full"
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <main className="flex-1 py-10 max-w-6xl mx-auto relative">
        {loading && recipes.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <>
            {loading && recipes.length > 0 && (
              <p className="text-sm text-gray-500 absolute top-0 right-0">
                Loading new recipes...
              </p>
            )}
            <section>
              <Title className="text-3xl text-neutral-800 my-2">
                {query || hasActiveFilters
                  ? "Filtered Results"
                  : "Trending Now"}
              </Title>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </section>
          </>
        ) : (
          !loading && (
            <p className="text-center text-lg mt-6 text-gray-500">
              {error || "No Recipes Found"}
            </p>
          )
        )}
      </main>
    </div>
  );
}
