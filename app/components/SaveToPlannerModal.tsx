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

type SaveToPlannerModalProps = {
  recipeId: number;
  recipeTitle: string;
  trigger?: React.ReactNode;
};

// Local date helper
function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function SaveToPlannerModal({
  recipeId,
  recipeTitle,
  trigger,
}: SaveToPlannerModalProps) {
  const { addMeal } = useMealPlannerContext();
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [mealCategory, setMealCategory] = useState<
    "Breakfast" | "Lunch" | "Dinner" | "Snack"
  >("Lunch");
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
                const localDateString = toLocalDateString(date);
                return (
                  <option key={day} value={localDateString}>
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
              onChange={(e) => setMealCategory(e.target.value as any)}
              className="w-full p-2 border rounded"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
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
