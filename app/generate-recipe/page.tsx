"use client";

import { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { Recipe } from "@/types/types";

export default function GenerateRecipe() {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const { addMeal } = useMealPlannerContext();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        body: JSON.stringify({ ingredients }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        ✨ Generate a Custom Recipe
      </h1>
      <p className="text-gray-600 mb-4">
        Enter ingredients, and let AI create a recipe for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Enter ingredients..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <Button
          onClick={handleGenerate}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Generate
        </Button>
      </div>

      {loading && <p>Generating...</p>}

      {recipe && (
        <RecipeCard
          recipe={recipe}
          onAddToPlanner={(recipe) => addMeal(recipe)}
        />
      )}
    </div>
  );
}

function RecipeCard({ recipe, onAddToPlanner }) {
  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold mt-2">{recipe.title}</h3>
      <p className="text-gray-700">{recipe.description}</p>
      <Button
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600"
        onClick={() => onAddToPlanner(recipe)}
      >
        Add to Planner
      </Button>
    </Card>
  );
}
