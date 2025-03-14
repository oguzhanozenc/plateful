"use client";

import { useParams, useRouter } from "next/navigation";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { Button } from "@/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "@/ui/dialog";
import RecipePreview from "@/app/components/RecipePreview";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Input } from "@/ui/input";
import { LucideEdit, LucideTrash, LucideArrowLeft } from "lucide-react";

export default function PlannerDay() {
  const { date } = useParams<{ date: string }>();
  const router = useRouter();
  const {
    loggedMeals,
    setSelectedMeal,
    selectedMeal,
    mealCategory,
    setMealCategory,
    notes,
    setNotes,
    recipeTitle,
    setRecipeTitle,
    handleSaveOrEditMeal,
    removeMeal,
  } = useMealPlannerContext();

  const mealsForDay = loggedMeals.filter((meal) => meal.date === date);

  return (
    <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 py-6 sm:py-8 md:py-16 space-y-6 sm:space-y-10 md:space-y-14 min-h-screen">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <Button variant="outline" onClick={() => router.push("/planner")}>
          <LucideArrowLeft className="w-5 h-5 mr-2" /> Back to Planner
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Meals for {date}</h1>
      </div>

      {/* 🔹 Meal List */}
      {mealsForDay.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">
          No meals planned for this day.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mealsForDay.map((meal) => (
            <div
              key={meal.id}
              className="border rounded-lg p-4 shadow-sm bg-white transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {meal.title}
              </h2>

              <RecipePreview />

              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => {
                  setSelectedMeal(meal); // ✅ Set selected meal
                  setRecipeTitle(meal.title); // ✅ Set title directly
                  setMealCategory(meal.category);
                  setNotes(meal.notes ?? "");
                }}
              >
                <LucideEdit className="w-4 h-4 mr-2" /> Edit Meal
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Meal Editing Modal */}
      {selectedMeal && (
        <Dialog
          open={!!selectedMeal}
          onOpenChange={() => setSelectedMeal(null)}
        >
          <DialogContent className="max-w-lg w-full rounded-lg">
            <DialogHeader>
              <DialogTitle>Edit Meal</DialogTitle>
            </DialogHeader>

            {/* 🔹 Editable Title (Now Uses Context) */}
            <Input
              type="text"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary"
            />

            {/* 🔹 Select Meal Category */}
            <Select value={mealCategory} onValueChange={setMealCategory}>
              <SelectTrigger className="mt-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>

            {/* 🔹 Notes Input */}
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[100px] mt-3"
              placeholder="Add notes..."
            />

            {/* 🔹 Actions */}
            <div className="flex justify-between mt-6">
              <Button
                variant="destructive"
                onClick={() => {
                  removeMeal(selectedMeal.id);
                  setSelectedMeal(null);
                }}
              >
                <LucideTrash className="w-4 h-4 mr-1" /> Delete Meal
              </Button>
              <Button
                onClick={() => {
                  handleSaveOrEditMeal(
                    recipeTitle.trim(),
                    selectedMeal.fullRecipe ?? "",
                    mealCategory,
                    selectedMeal.date,
                    selectedMeal.recipeId
                  );
                  setSelectedMeal(null);
                }}
              >
                <LucideEdit className="w-4 h-4 mr-1" /> Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
