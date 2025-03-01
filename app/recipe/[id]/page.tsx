"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { RecipeDetailsSkeleton } from "@/app/components/RecipeDetailsSkeleton";

type Recipe = {
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: { original: string }[];
  analyzedInstructions: { steps: { step: string }[] }[];
  healthScore: number;
  aggregateLikes: number;
};

export default function RecipeDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/recipes/${params.id}`);
        if (!res.ok) throw new Error(`Failed to fetch recipe: ${res.status}`);
        const data: Recipe = await res.json();
        setRecipe(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (params.id) fetchRecipe();
  }, [params.id]);

  if (loading) return <RecipeDetailsSkeleton />;

  if (error || !recipe)
    return (
      <p className="text-center text-red-500 mt-8">
        {error || "Recipe not found."}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <Card className="border rounded-md shadow-sm p-6 md:flex md:flex-row md:gap-8 bg-white">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            {recipe.title}
          </h1>
          <p className="text-sm text-gray-600">
            🔥 Health Score: {recipe.healthScore} | 👍 {recipe.aggregateLikes}{" "}
            Likes
          </p>

          <h3 className="text-xl font-semibold mt-6">Ingredients</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6">Instructions</h3>
          <ol className="list-decimal list-inside mt-2 text-gray-700">
            {recipe.analyzedInstructions.length > 0 ? (
              recipe.analyzedInstructions[0].steps.map((step, index) => (
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
