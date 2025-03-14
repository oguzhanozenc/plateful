"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/ui/button";
import { ArrowLeft } from "lucide-react";
import { RecipeDetailsSkeleton } from "@/app/components/RecipeDetailsSkeleton";
import SaveToPlannerModal from "@/app/components/SaveToPlannerModal";
import { useFetchedRecipe } from "@/context/FetchedRecipeContext";

export default function RecipeDetails() {
  const { recipe, loading, error } = useFetchedRecipe();
  const router = useRouter();

  if (loading) return <RecipeDetailsSkeleton />;

  if (error) {
    return (
      <div className="text-center mx-auto w-full max-w-4xl min-h-screen py-16 px-6 space-y-6">
        <p className="text-red-500 text-lg font-medium">{error}</p>
        <Button variant="secondary" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center mx-auto w-full max-w-4xl min-h-screen py-16 px-6 space-y-6">
        <p className="text-gray-500 text-lg">
          Recipe not found. Please try again later.
        </p>
        <Button variant="secondary" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl min-h-screen py-16 px-6 space-y-14 max-sm:p-2">
      {/*  Top Navigation */}
      <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b z-10">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>

        <SaveToPlannerModal />
      </div>

      {/* Recipe Image */}
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={recipe.image || "/placeholder-recipe.jpg"}
          alt={recipe.title}
          width={800}
          height={400}
          className="w-full h-80 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/*  Recipe Details */}
      <div className="mt-6 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{recipe.title}</h1>

        {/* Recipe Metadata */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-700 font-medium">
          {recipe.readyInMinutes !== undefined && (
            <span className="px-3 py-1 bg-gray-200 rounded-full">
              ⏳ {recipe.readyInMinutes} min
            </span>
          )}
          {recipe.servings !== undefined && (
            <span className="px-3 py-1 bg-gray-200 rounded-full">
              🍽️ Serves {recipe.servings}
            </span>
          )}
          {recipe.healthScore !== undefined && (
            <span className="px-3 py-1 bg-gray-200 rounded-full">
              💚 Health: {recipe.healthScore}
            </span>
          )}
          {recipe.aggregateLikes !== undefined && (
            <span className="px-3 py-1 bg-gray-200 rounded-full">
              👍 {recipe.aggregateLikes} Likes
            </span>
          )}
        </div>
        {/* Ingredients Section */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Ingredients
          </h3>
          {recipe.extendedIngredients?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recipe.extendedIngredients.map((ingredient) => (
                <span
                  key={ingredient.id}
                  className="p-2 bg-gray-100 rounded-md"
                >
                  ✅ {ingredient.original}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No ingredients available.</p>
          )}
        </section>

        {/*  Instructions Section */}
        <section className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Instructions
          </h3>
          {recipe.analyzedInstructions?.[0]?.steps?.length ? (
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="bg-gray-100 p-3 rounded-md">
                  {step.step}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">No instructions available.</p>
          )}
        </section>
      </div>
    </div>
  );
}
