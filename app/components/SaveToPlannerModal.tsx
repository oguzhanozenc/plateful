"use client";

import { useState } from "react";
import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import { useFetchedRecipe } from "@/context/FetchedRecipeContext";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Bookmark } from "lucide-react";
import PlannerMealForm from "@/app/components/PlannerMealForm";
import RecipePreview from "@/app/components/RecipePreview";

export default function SaveToPlannerModal() {
  const { recipe: fetchedRecipe } = useFetchedRecipe();
  const { recipe: aiRecipe } = useGenerateRecipe();
  const { handleSaveOrEditMeal, selectedDay, mealCategory } =
    useMealPlannerContext();

  const recipeToSave = fetchedRecipe || aiRecipe;
  const defaultTitle = fetchedRecipe?.title || "AI-Generated Recipe";

  const [localRecipeTitle, setLocalRecipeTitle] = useState(defaultTitle);

  const handleSave = () => {
    if (!selectedDay || !recipeToSave) return;
    handleSaveOrEditMeal(
      localRecipeTitle.trim(),
      typeof recipeToSave === "string" ? recipeToSave : recipeToSave.title,
      mealCategory,
      selectedDay
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bookmark className="w-4 h-4 mr-2" /> Save to Planner
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Save Meal to Planner</DialogTitle>
        </DialogHeader>
        <PlannerMealForm
          localRecipeTitle={localRecipeTitle}
          setLocalRecipeTitle={setLocalRecipeTitle}
        />
        <RecipePreview />
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              onClick={handleSave}
              disabled={!selectedDay || !recipeToSave}
            >
              Save to Planner
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
