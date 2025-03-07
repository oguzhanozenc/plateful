"use client";

import { useState, useEffect, useRef } from "react";
import IngredientsList from "@/app/components/IngredientsList";
import AiRecipe from "@/app/components/AiRecipe";
import { getAiRecipe } from "@/lib/getAiRecipe";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";

export default function GenerateRecipePage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const recipeSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (recipe.length > 0 && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function fetchAiRecipe() {
    if (ingredients.length < 3) return;
    setLoading(true);
    setRecipe("Generating AI recipe... 🍽️");

    const recipeMarkdown = await getAiRecipe(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false);
  }

  function addIngredient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient") as string;

    if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
      setIngredients((prev) => [...prev, newIngredient]);
    }

    e.currentTarget.reset();
  }

  function removeIngredient(ingredientToRemove: string) {
    setIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  return (
    <div className="mx-auto w-full min-w-full max-w-full h-full min-h-screen py-16 px-6 space-y-14">
      <Card className="p-6 shadow-lg border border-muted">
        <form onSubmit={addIngredient} className="flex gap-4">
          <Input
            type="text"
            placeholder="e.g. chicken"
            aria-label="Add ingredient"
            name="ingredient"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Add Ingredient
          </Button>
        </form>
      </Card>

      <IngredientsList
        ingredients={ingredients}
        getRecipe={fetchAiRecipe}
        removeIngredient={removeIngredient}
      />

      {loading && <p className="text-muted-foreground text-center">🔄</p>}

      {recipe && (
        <Card className="mt-6 p-6 bg-muted/5">
          <AiRecipe recipe={recipe} />
        </Card>
      )}
    </div>
  );
}
