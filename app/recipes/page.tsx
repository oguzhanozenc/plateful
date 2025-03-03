"use client";

import { useRecipes } from "@/hooks/useRecipes";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { RecipeCard } from "@/app/components/RecipeCard";
import { RecipeCardSkeleton } from "@/app/components/RecipeCardSkeleton";
import { Filter, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Badge } from "@/ui/badge";
import { Separator } from "@/ui/separator";
import { ScrollArea } from "@/ui/scroll-area";
import { useState } from "react";
import { Filters } from "@/types/types";

export default function Recipes() {
  const {
    recipes,
    query,
    setQuery,
    filters = { cuisine: "", diet: "", intolerances: "", maxReadyTime: "" },
    setFilters,
    handleSearch,
    resetFilters,
    loading,
  } = useRecipes();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions: Record<keyof Filters, string[]> = {
    cuisine: ["Italian", "Mexican", "Chinese", "Indian", "American"],
    diet: ["Vegan", "Vegetarian", "Ketogenic", "Paleo", "Pescatarian"],
    intolerances: ["Gluten", "Dairy", "Egg", "Nuts", "Shellfish"],
    maxReadyTime: ["15", "30", "60", "120"],
  };

  const toggleFilter = (key: keyof Filters, option: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === option ? "" : option,
    }));
  };

  const hasActiveFilters = Object.values(filters).some((val) => val);

  return (
    <div className="min-h-screen flex flex-col px-6">
      {/* Header Section */}
      <header className="text-center max-w-4xl mx-auto w-full py-12">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
          Discover & Save Recipes
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Plan your meals effortlessly with curated recipes.
        </p>

        {/* Search & Filters Row */}
        <div className="relative mt-6 w-full max-w-lg mx-auto flex gap-2">
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
          <Button onClick={handleSearch} size="icon">
            <Search className="w-5 h-5" />
          </Button>

          {/* Filters Dropdown */}
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
              <Button
                variant="secondary"
                onClick={resetFilters}
                className="w-full"
                disabled={!hasActiveFilters}
              >
                Reset Filters
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Recipes Section */}
      <main className="flex-1 py-10 max-w-6xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <section>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              {query || hasActiveFilters ? "Filtered Results" : "Trending Now"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-lg mt-6 text-gray-500">
            No Recipes Found
          </p>
        )}
      </main>
    </div>
  );
}
