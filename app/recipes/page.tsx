"use client";

import { useRecipes } from "@/hooks/useRecipes";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { Card } from "@/ui/card";
import { RecipeCard } from "@/app/components/RecipeCard";
import { RecipeCardSkeleton } from "@/app/components/RecipeCardSkeleton";
import { Filter, Search } from "lucide-react";

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder={label} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default function Recipes() {
  const {
    recipes,
    query,
    setQuery,
    filters,
    setFilters,
    handleSearch,
    handleFilterApply,
    resetFilters,
    loading,
    error,
  } = useRecipes();

  return (
    <div className="bg-background min-h-screen flex flex-col px-6">
      <header className="text-center max-w-4xl mx-auto w-full py-12">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
          Discover & Save Recipes
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Plan your meals effortlessly with curated recipes.
        </p>

        <Card className="mt-6 p-4 shadow-md flex items-center gap-4 w-full max-w-lg mx-auto">
          <Input
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </Card>
      </header>

      <section className="flex flex-wrap justify-center gap-4 px-4">
        <FilterSelect
          label="Select Cuisine"
          value={filters.cuisine}
          onChange={(val) => setFilters((prev) => ({ ...prev, cuisine: val }))}
          options={["Italian", "Mexican", "Chinese", "Indian", "American"]}
        />
        <FilterSelect
          label="Select Diet"
          value={filters.diet}
          onChange={(val) => setFilters((prev) => ({ ...prev, diet: val }))}
          options={["Vegan", "Vegetarian", "Ketogenic", "Paleo", "Pescatarian"]}
        />
        <FilterSelect
          label="Select Allergy"
          value={filters.intolerances}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, intolerances: val }))
          }
          options={["Gluten", "Dairy", "Egg", "Nuts", "Shellfish"]}
        />
        <FilterSelect
          label="Max Cooking Time"
          value={filters.maxReadyTime}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, maxReadyTime: val }))
          }
          options={["15", "30", "60", "120"]}
        />

        <Button
          variant="outline"
          onClick={handleFilterApply}
          className="flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" /> Filter Recipes
        </Button>

        <Button
          variant="secondary"
          onClick={resetFilters}
          className="flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" /> Reset Filters
        </Button>
      </section>

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
              {query ? "Search Results" : "Filtered Results"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              No Recipes Found
            </h2>
            {!loading && (
              <div className="text-center mt-6">
                <p className="text-gray-500 text-lg">
                  {error ||
                    "Try changing filters or searching for something else."}
                </p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
