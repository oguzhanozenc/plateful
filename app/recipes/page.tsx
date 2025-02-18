"use client";

import { useRecipes } from "@/hooks/useRecipes";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { Recipe } from "@/types/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/ui/dialog";

export default function Recipes() {
  const {
    query,
    setQuery,
    diet,
    setDiet,
    limit,
    setLimit,
    recipes,
    loading,
    error,
    handleSearch,
  } = useRecipes();

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6 text-[#1E3229]">
        🍽️ Find Recipes
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Enter ingredients (e.g., tomato, cheese)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <Select value={limit} onValueChange={setLimit}>
          <SelectTrigger>
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>
        <Select value={diet} onValueChange={setDiet}>
          <SelectTrigger>
            <SelectValue placeholder="Dietary Preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Any">Any</SelectItem>
            <SelectItem value="vegetarian">Vegetarian</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
            <SelectItem value="gluten free">Gluten Free</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700"
        >
          Search
        </Button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No recipes found. Try different ingredients.
          </p>
        )}
      </div>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Card className="p-4 shadow-md hover:shadow-lg transition-all cursor-pointer">
          <div className="relative w-full h-40">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-md w-full h-full object-cover"
            />
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-semibold">{recipe.title}</h3>
            <p className="text-gray-500 text-sm mt-1">
              {recipe.missedIngredientCount} missing ingredients
            </p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{recipe.title}</DialogTitle>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-md w-full h-52 object-cover mt-4"
        />
        <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {recipe.usedIngredients?.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
