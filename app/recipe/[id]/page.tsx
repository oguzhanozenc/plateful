"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { RecipeDetailsSkeleton } from "@/app/components/RecipeDetailsSkeleton";
export default function RecipeDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch recipe: ${res.status}`);
        const data = await res.json();
        setRecipe(data);
      } catch (err: any) {
        setError(err.message || "Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchRecipe();
  }, [id]);

  if (loading) return <RecipeDetailsSkeleton />;

  if (error || !recipe)
    return (
      <p className="text-center text-red-500 mt-8">
        {error || "Recipe not found."}
      </p>
    );

  const {
    title,
    image,
    readyInMinutes,
    servings,
    extendedIngredients,
    analyzedInstructions,
    healthScore,
    aggregateLikes,
  } = recipe;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <Card className="border rounded-md shadow-sm p-6 md:flex md:flex-row md:gap-8 bg-white">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-light text-gray-900 mb-4">{title}</h1>
          <p className="text-sm text-gray-600">
            🔥 Health Score: {healthScore} | 👍 {aggregateLikes} Likes
          </p>

          <h3 className="text-xl font-semibold mt-6">Ingredients</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6">Instructions</h3>
          <ol className="list-decimal list-inside mt-2 text-gray-700">
            {analyzedInstructions.length > 0 ? (
              analyzedInstructions[0].steps.map((step, index) => (
                <li key={index} className="py-2">
                  {step.step}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No instructions available.</p>
            )}
          </ol>

          <Button
            onClick={() => router.back()}
            className="mt-8 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
          >
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
}
