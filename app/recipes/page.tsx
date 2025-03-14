"use client";

import { useState, useEffect } from "react";
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

  // Prevent unnecessary API calls when the query is empty or too short
  useEffect(() => {
    if (debouncedQuery.length >= 3 || debouncedQuery.length === 0) {
      handleSearch();
    }
  }, [debouncedQuery, handleSearch]);

  //  filter options
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
    <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 py-6 sm:py-8 md:py-16 space-y-6 sm:space-y-10 md:space-y-14 min-h-screen">
      {/*  Page Header */}
      <header className="flex flex-col justify-self-center w-full">
        <Title>Discover Recipes</Title>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Plan your meals effortlessly with curated recipes.
        </p>

        {/*  Search & Filter Controls */}
        <div className="flex gap-2 mt-6  max-sm:flex-wrap max-sm:justify-center">
          <Input
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <Button variant="ghost" size="icon" onClick={() => setQuery("")}>
              <X className="w-4 h-4 text-gray-400" />
            </Button>
          )}
          <Button onClick={handleSearch} size="icon" className="ml-2 p-2">
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
                    handleSearch();
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

      {/*  Recipe Results */}
      <main className="flex flex-col justify-between gap-5 py-10 max-w-6xl mx-auto">
        {loading && recipes.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between items-stretch">
            {Array.from({ length: 6 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <section className="flex flex-col gap-6">
            <Title size="sm">
              {query || hasActiveFilters ? "Filtered Results" : "Trending Now"}
            </Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between items-stretch">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        ) : (
          !loading && (
            <p className="text-center text-lg mt-6 text-gray-500">
              {error
                ? error
                : "Please try again with different search parameters or filters."}
            </p>
          )
        )}
      </main>
    </div>
  );
}
