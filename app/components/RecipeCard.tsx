"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Recipe } from "@/types/types";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const calories = recipe.nutrition?.nutrients?.find(
    (n) => n.name === "Calories"
  )?.amount;

  return (
    <Card className="border rounded-md shadow-sm hover:shadow-md transition-shadow p-4 bg-white">
      <img
        src={recipe.image}
        alt={recipe.title || "Recipe Image"}
        className="rounded-md w-full h-40 object-cover mb-3"
      />

      <h3 className="text-base font-medium text-gray-900 mb-1">
        {recipe.title}
      </h3>

      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
        {recipe.readyInMinutes && <span>⏳ {recipe.readyInMinutes} min</span>}
        {recipe.servings && <span>🍽️ Serves {recipe.servings}</span>}
        {calories && <span>🔥 {calories} kcal</span>}
      </div>

      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>💚 Health: {recipe.healthScore ?? "N/A"}</span>
        <span>👍 {recipe.aggregateLikes ?? 0} Likes</span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-white">
        {recipe.cuisines?.map((cuisine) => (
          <span key={cuisine} className="bg-indigo-500 px-2 py-1 rounded">
            {cuisine}
          </span>
        ))}
        {recipe.diets?.includes("vegetarian") && (
          <span className="bg-green-500 px-2 py-1 rounded">Vegetarian</span>
        )}
        {recipe.diets?.includes("vegan") && (
          <span className="bg-green-600 px-2 py-1 rounded">Vegan</span>
        )}
        {recipe.diets?.includes("gluten free") && (
          <span className="bg-yellow-500 px-2 py-1 rounded">Gluten-Free</span>
        )}
      </div>

      <Button
        onClick={() => router.push(`/recipe/${recipe.id}`)}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-normal py-2 mt-3"
      >
        View Recipe
      </Button>
    </Card>
  );
}
