"use client";

import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { useDateContext } from "@/context/DateContext";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Input } from "@/ui/input";
import { MealCategory } from "@/types/types";

const MEAL_CATEGORIES: MealCategory[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
];

type PlannerMealFormProps = {
  localRecipeTitle: string;
  setLocalRecipeTitle: (title: string) => void;
};

export default function PlannerMealForm({
  localRecipeTitle,
  setLocalRecipeTitle,
}: PlannerMealFormProps) {
  const { getCurrentWeekDates } = useDateContext();
  const {
    selectedDay,
    setSelectedDay,
    mealCategory,
    setMealCategory,
    notes,
    setNotes,
  } = useMealPlannerContext();
  const weekDates = getCurrentWeekDates();

  return (
    <div className="space-y-5">
      {/* Editable Meal Title */}
      <Input
        value={localRecipeTitle}
        onChange={(e) => setLocalRecipeTitle(e.target.value)}
        className="w-full"
      />

      {/*  Select Day Dropdown */}
      <Select value={selectedDay} onValueChange={setSelectedDay}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a day" />
        </SelectTrigger>
        <SelectContent>
          {weekDates.map((day) => (
            <SelectItem key={day.fullDate} value={day.fullDate}>
              {day.formattedDate}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/*  Select Meal Category Dropdown */}
      <Select value={mealCategory} onValueChange={setMealCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {MEAL_CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Notes Input */}
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full"
        placeholder="Add notes..."
      />
    </div>
  );
}
