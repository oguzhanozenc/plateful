"use client";

import { useParams, useRouter } from "next/navigation";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import Image from "next/image";
import { Button } from "@/ui/button";
import { ArrowLeft, Bookmark } from "lucide-react";
import { RecipeDetailsSkeleton } from "@/app/components/RecipeDetailsSkeleton";
import SaveToPlannerModal from "@/app/components/SaveToPlannerModal";

export default function RecipeDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { recipe, loading, error } = useRecipeDetails(params?.id);

  if (loading) return <RecipeDetailsSkeleton />;
  if (error || !recipe) {
    return (
      <div className="mx-auto w-full max-w-4xl min-h-screen py-16 px-6 space-y-14 text-center">
        <p className="text-red-500 text-lg font-medium">
          {error || "Recipe not found."}
        </p>
        <Button variant="secondary" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl min-h-screen py-16 px-6 space-y-14">
      <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b z-10">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>

        <SaveToPlannerModal
          recipeId={recipe.id}
          recipeTitle={recipe.title}
          trigger={
            <Button variant="outline">
              <Bookmark className="w-4 h-4 mr-2" /> Save to Planner
            </Button>
          }
        />
      </div>

      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover"
          priority
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
            💚 Health: {recipe.healthScore ?? "N/A"}
          </span>
          <span className="px-3 py-1 bg-gray-200 rounded-full">
            👍 {recipe.aggregateLikes ?? 0} Likes
          </span>
        </div>

        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Ingredients
          </h3>
          {recipe.extendedIngredients.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <span key={index} className="p-2 bg-gray-100 rounded-md">
                  ✅ {ingredient.original}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No ingredients available.</p>
          )}
        </section>

        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Instructions
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-3">
            {recipe.analyzedInstructions.length > 0 &&
            recipe.analyzedInstructions[0].steps.length > 0 ? (
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
