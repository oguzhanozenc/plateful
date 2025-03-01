"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { RecipeDetailsSkeleton } from "@/app/components/RecipeDetailsSkeleton";
import type { Recipe } from "@/types/types";

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = useCallback(async () => {
    if (!id) return;

    try {
      const res = await fetch(`/api/recipes/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch recipe: ${res.status}`);
      const data: Recipe = await res.json();
      setRecipe(data);
    } catch (err) {
      setError((err as Error).message || "Failed to load recipe.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (loading) return <RecipeDetailsSkeleton />;

  if (error || !recipe)
    return (
      <p className="text-center text-red-500 mt-8">
        {error || "Recipe not found."}
      </p>
    );

  return (
    <Suspense fallback={<RecipeDetailsSkeleton />}>
      <RecipeDetailsContent recipe={recipe} onBack={router.back} />
    </Suspense>
  );
}

function RecipeDetailsContent({
  recipe,
  onBack,
}: {
  recipe: Recipe;
  onBack: () => void;
}) {
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
            🔥 Health Score: {recipe.healthScore ?? "N/A"} | 👍{" "}
            {recipe.aggregateLikes ?? 0} Likes
          </p>

          <h3 className="text-xl font-semibold mt-6">Ingredients</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {recipe.extendedIngredients?.length ? (
              recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))
            ) : (
              <p className="text-gray-500">No ingredients listed.</p>
            )}
          </ul>

          <h3 className="text-xl font-semibold mt-6">Instructions</h3>
          <ol className="list-decimal list-inside mt-2 text-gray-700">
            {recipe.analyzedInstructions?.length > 0 &&
            recipe.analyzedInstructions[0].steps.length ? (
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
            onClick={onBack}
            className="mt-8 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
          >
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
}
