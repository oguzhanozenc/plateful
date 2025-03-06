"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Recipe } from "@/types/types";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const imageSrc = recipe?.image || "/placeholder-recipe.jpg";
  const readyInMinutes = recipe?.readyInMinutes ?? "N/A";
  const servings = recipe?.servings ?? "N/A";
  const cuisines = recipe?.cuisines ?? [];
  const diets = recipe?.diets ?? [];

  return (
    <Card className="flex flex-col border rounded-md shadow-sm hover:shadow-md transition-shadow p-4 bg-white">
      <button
        onClick={() => router.push(`/recipes/${recipe.id}`)}
        className="block w-full"
      >
        <Image
          src={imageSrc}
          alt={recipe.title || "Recipe Image"}
          width={300}
          height={200}
          className="rounded-md w-full h-40 object-cover mb-3"
          priority
        />
      </button>

      <h3 className="text-base font-medium text-gray-900 mb-1">
        {recipe.title}
      </h3>

      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
        <span>⏳ {readyInMinutes} min</span>
        <span>🍽️ Serves {servings}</span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-white mb-3">
        {cuisines.map((cuisine) => (
          <span key={cuisine} className="bg-indigo-500 px-2 py-1 rounded">
            🌎 {cuisine}
          </span>
        ))}
        {diets.map((diet) => (
          <span key={diet} className="bg-green-500 px-2 py-1 rounded">
            🥗 {diet}
          </span>
        ))}
      </div>

      <div className="flex items-end mt-auto justify-end">
        <Button
          onClick={() => router.push(`/recipes/${recipe.id}`)}
          className="bg-[#2A6051] hover:bg-[#1E6B4E] text-white text-sm font-normal py-2 mt-auto"
        >
          View Recipe
        </Button>
      </div>
    </Card>
  );
}
