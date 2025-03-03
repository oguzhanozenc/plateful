"use client";

import { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { Recipe, LoggedMeal } from "@/types/types";

export default function GenerateRecipe() {
  const [ingredients, setIngredients] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { addMeal } = useMealPlannerContext();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        body: JSON.stringify({ ingredients }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: Recipe = await response.json();
      setRecipe(data);
    } catch (error: unknown) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlanner = () => {
    if (!recipe) return;

    const loggedMeal: LoggedMeal = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      recipeId: recipe.id,
      name: recipe.title,
      notes: recipe.description || "",
    };

    addMeal(loggedMeal);
  };

  return (
    <div className="mx-auto w-full min-wfull max-w-full h-full min-h-screen py-16 px-6 space-y-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          ✨ Generate a Custom Recipe
        </h1>
        <p className="text-gray-600 mb-4">
          Enter ingredients, and let AI create a recipe for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-self-start">
          <Input
            placeholder="Enter ingredients..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Button
            onClick={handleGenerate}
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
      {loading && <p>Generating...</p>}

      {recipe && (
        <RecipeCard recipe={recipe} onAddToPlanner={handleAddToPlanner} />
      )}
    </div>
  );
}

type RecipeCardProps = {
  recipe: Recipe;
  onAddToPlanner: () => void;
};

function RecipeCard({ recipe, onAddToPlanner }: RecipeCardProps) {
  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold mt-2">{recipe.title}</h3>
      <p className="text-gray-700">{recipe.description}</p>
      <Button
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600"
        onClick={onAddToPlanner}
      >
        Add to Planner
      </Button>
    </Card>
  );
}
