"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Recipe } from "@/types/types";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const {
    title,
    readyInMinutes,
    servings,
    image,
    healthScore,
    aggregateLikes,
    nutrition,
    cuisines,
    vegetarian,
    vegan,
    glutenFree,
  } = recipe;

  const metaItems = [];
  if (readyInMinutes) metaItems.push(`⏳ ${readyInMinutes} min`);
  if (servings) metaItems.push(`🍽️ Serves ${servings}`);
  if (nutrition?.nutrients) {
    const calories = nutrition.nutrients.find(
      (n) => n.name === "Calories"
    )?.amount;
    if (calories) metaItems.push(`🔥 ${calories} kcal`);
  }

  return (
    <Card className="border rounded-md shadow-sm hover:shadow-md transition-shadow p-4 bg-white">
      <img
        src={image}
        alt={title}
        className="rounded-md w-full h-40 object-cover mb-3"
      />
      <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>

      {metaItems.length > 0 && (
        <ul className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
          {metaItems.map((item, idx) => (
            <li
              key={idx}
              className="before:content-['•'] before:mr-1 before:text-gray-400"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>💚 Health: {healthScore || "N/A"}</span>
        <span>👍 {aggregateLikes || 0} Likes</span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-white">
        {cuisines?.length > 0 &&
          cuisines.map((cuisine, index) => (
            <span key={index} className="bg-indigo-500 px-2 py-1 rounded">
              {cuisine}
            </span>
          ))}
        {vegetarian && (
          <span className="bg-green-500 px-2 py-1 rounded">Vegetarian</span>
        )}
        {vegan && <span className="bg-green-600 px-2 py-1 rounded">Vegan</span>}
        {glutenFree && (
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
