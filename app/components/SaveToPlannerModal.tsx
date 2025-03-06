"use client";

import { useState, useMemo } from "react";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { daysOfWeek } from "@/types/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Bookmark } from "lucide-react";

const MEAL_CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;

type MealCategory = (typeof MEAL_CATEGORIES)[number];

type SaveToPlannerModalProps = {
  recipeId: number;
  recipeTitle: string;
  trigger?: React.ReactNode;
};

function toLocalDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function SaveToPlannerModal({
  recipeId,
  recipeTitle,
  trigger,
}: SaveToPlannerModalProps) {
  const { addMeal } = useMealPlannerContext();
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [mealCategory, setMealCategory] = useState<MealCategory>("Lunch");
  const [notes, setNotes] = useState("");

  const todayDate = useMemo(() => toLocalDateString(new Date()), []);
  const [selectedDay, setSelectedDay] = useState<string>(todayDate);

  return (
    <Dialog open={isPlannerOpen} onOpenChange={setIsPlannerOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="secondary">
            <Bookmark className="w-4 h-4 mr-2" /> Save to Planner
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Meal to Planner</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Select Day</span>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {daysOfWeek.map((day, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                return (
                  <option key={day} value={toLocalDateString(date)}>
                    {day} ({date.toDateString()})
                  </option>
                );
              })}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Meal Category</span>
            <select
              value={mealCategory}
              onChange={(e) => setMealCategory(e.target.value as MealCategory)}
              className="w-full p-2 border rounded"
            >
              {MEAL_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Optional notes..."
            />
          </label>

          <Button
            onClick={() => {
              addMeal({
                id: crypto.randomUUID(),
                date: selectedDay,
                category: mealCategory,
                recipeId,
                name: recipeTitle,
                notes,
              });
              setIsPlannerOpen(false);
            }}
          >
            Save to Planner
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
