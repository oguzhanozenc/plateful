"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/ui/button";
import { ArrowLeft, Bookmark } from "lucide-react";
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
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) fetchRecipe();
  }, [params.id]);

  if (loading) return <RecipeDetailsSkeleton />;
  if (error || !recipe)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-red-500 text-lg font-medium">
          {error || "Recipe not found."}
        </p>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b z-10">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>
        <Button variant="outline">
          <Bookmark className="w-4 h-4 mr-2" /> Save to Planner
        </Button>
      </div>

      <div className="relative rounded-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="mt-6 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{recipe.title}</h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-700 font-medium">
          <span className="px-3 py-1 bg-gray-200 rounded-full">
            ⏳ {recipe.readyInMinutes} min
          </span>
          <span className="px-3 py-1 bg-gray-200 rounded-full">
            🍽️ Serves {recipe.servings}
          </span>
          <span className="px-3 py-1 bg-gray-200 rounded-full">
            🔥 Health: {recipe.healthScore}
          </span>
          <span className="px-3 py-1 bg-gray-200 rounded-full">
            👍 {recipe.aggregateLikes} Likes
          </span>
        </div>

        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Ingredients
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {recipe.extendedIngredients.map((ingredient, index) => (
              <span key={index} className="p-2 bg-gray-100 rounded-md">
                ✅ {ingredient.original}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Instructions
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-3">
            {recipe.analyzedInstructions.length > 0 ? (
              recipe.analyzedInstructions[0].steps.map((step, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-md">
                  {step.step}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No instructions available.</p>
            )}
          </ol>
        </section>
      </div>
    </div>
  );
}
