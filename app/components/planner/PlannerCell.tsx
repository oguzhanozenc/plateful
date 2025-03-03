"use client";

import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { useState } from "react";
import { LoggedMeal } from "@/types/types";
import { LucideEdit, LucideTrash, LucidePlus } from "lucide-react";

export default function PlannerCell({ date }: { date: Date | null }) {
  const { loggedMeals, addMeal, removeMeal, editMeal } =
    useMealPlannerContext();
  const [newMeal, setNewMeal] = useState("");
  const [editedMealName, setEditedMealName] = useState("");

  if (!date) return <div className="border p-2 bg-gray-100" />;

  const dateKey = date.toISOString().split("T")[0];
  const mealList: LoggedMeal[] = loggedMeals.filter(
    (meal) => meal.date === dateKey
  );
  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`border rounded-lg shadow-sm flex flex-col justify-between p-2 aspect-square cursor-pointer relative
            ${
              isToday ? "border-blue-700 bg-blue-200 font-bold" : "bg-white"
            } hover:bg-gray-50 w-full h-full`}
        >
          <span className="text-gray-900 font-semibold">{date.getDate()}</span>

          <div className="flex flex-col gap-1 mt-2 flex-grow overflow-hidden">
            {mealList.slice(0, 3).map((meal) => (
              <div
                key={meal.id}
                className="bg-gray-100 px-2 py-1 rounded-md text-xs truncate"
              >
                {meal.name}
              </div>
            ))}
          </div>

          {mealList.length > 3 && (
            <span className="absolute bottom-2 left-2 text-blue-600 text-xs hover:underline">
              + {mealList.length - 3} more
            </span>
          )}

          {mealList.length === 0 && (
            <div className="flex items-center justify-center flex-grow">
              <LucidePlus size={16} />
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Meals for {date.toLocaleDateString()}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          {mealList.map((meal) => (
            <Dialog key={meal.id}>
              <DialogTrigger asChild>
                <button className="bg-gray-100 px-2 py-1 rounded-md text-xs text-left truncate w-full hover:bg-gray-200 transition">
                  {meal.name}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-full">
                <DialogHeader>
                  <DialogTitle>Edit or Delete Meal</DialogTitle>
                </DialogHeader>
                <Input
                  defaultValue={meal.name}
                  onChange={(e) => setEditedMealName(e.target.value)}
                  placeholder="Edit meal name..."
                />
                <DialogFooter className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeMeal(meal.id)}
                  >
                    <LucideTrash size={16} className="mr-1" /> Delete
                  </Button>
                  <Button onClick={() => editMeal(meal.id, editedMealName)}>
                    <LucideEdit size={16} className="mr-1" /> Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="border-t pt-4 mt-4">
          <Input
            value={newMeal}
            onChange={(e) => setNewMeal(e.target.value)}
            placeholder="Enter meal..."
          />
          <DialogFooter className="mt-3">
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  if (newMeal.trim()) {
                    addMeal({
                      id: `${dateKey}-${Date.now()}`,
                      date: dateKey,
                      name: newMeal.trim(),
                    });
                    setNewMeal("");
                  }
                }}
              >
                Add Meal
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
