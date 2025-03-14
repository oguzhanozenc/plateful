"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  LoggedMeal,
  PlannedDayMeals,
  PlannedMeal,
  MealCategory,
} from "@/types/types";
import { toast } from "sonner";

type MealPlannerContextProps = {
  loggedMeals: LoggedMeal[];
  plannedMeals: PlannedDayMeals[];
  selectedMeal: LoggedMeal | null;
  setSelectedMeal: (meal: LoggedMeal | null) => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  mealCategory: MealCategory;
  setMealCategory: (category: MealCategory) => void;
  notes: string;
  setNotes: (notes: string) => void;
  handleSaveOrEditMeal: (
    recipeTitle: string,
    fullRecipe: string,
    mealCategory: MealCategory,
    selectedDay: string,
    recipeId?: string
  ) => void;
  removeMeal: (id: string) => void;
};

const MealPlannerContext = createContext<MealPlannerContextProps | undefined>(
  undefined
);

export function MealPlannerProvider({ children }: { children: ReactNode }) {
  //  Meal Data
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [plannedMeals, setPlannedMeals] = useState<PlannedDayMeals[]>([]);

  //  UI State
  const [selectedMeal, setSelectedMeal] = useState<LoggedMeal | null>(null);
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [mealCategory, setMealCategory] = useState<MealCategory>("Lunch");
  const [notes, setNotes] = useState<string>("");

  /** Helper function to show toast messages */
  const showToast = (message: string) => {
    toast.success(message);
  };

  /** Update `plannedMeals` when a meal is modified */
  const updatePlannedMeals = (updatedMeal: LoggedMeal) => {
    setPlannedMeals((prev) =>
      prev.map((day) => ({
        ...day,
        meals: day.meals.map(
          (meal): PlannedMeal =>
            meal.recipeId === updatedMeal.id
              ? {
                  category: updatedMeal.category ?? "Lunch",
                  recipeId: updatedMeal.recipeId ?? "",
                  title: updatedMeal.title,
                  notes: updatedMeal.notes ?? "",
                }
              : meal
        ),
      }))
    );
  };

  /** Handle Add or Edit Meal */
  function handleSaveOrEditMeal(
    recipeTitle: string,
    fullRecipe: string,
    mealCategory: MealCategory = "Lunch",
    selectedDay: string,
    recipeId?: string
  ) {
    if (!recipeTitle.trim()) {
      toast.error("Meal title cannot be empty.");
      return;
    }

    const existingMeal = loggedMeals.find((meal) => meal.recipeId === recipeId);

    const updatedMeal: LoggedMeal = {
      id: existingMeal?.id ?? crypto.randomUUID(),
      date: selectedDay,
      category: mealCategory,
      title: recipeTitle,
      fullRecipe,
      recipeId: recipeId ?? undefined,
      notes: notes,
    };

    if (existingMeal) {
      //  Edit Meal
      setLoggedMeals((prev) =>
        prev.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
      );
      updatePlannedMeals(updatedMeal);
      showToast("Meal updated successfully.");
    } else {
      //  Add New Meal
      setLoggedMeals((prev) => [...prev, updatedMeal]);

      setPlannedMeals((prev) => {
        const existingDay = prev.find((day) => day.day === selectedDay);
        const mealForPlan: PlannedMeal = {
          category: updatedMeal.category ?? "Lunch",
          recipeId: updatedMeal.recipeId ?? "",
          title: updatedMeal.title,
          notes: updatedMeal.notes ?? "",
        };

        return existingDay
          ? prev.map((day) =>
              day.day === selectedDay
                ? { ...day, meals: [...day.meals, mealForPlan] }
                : day
            )
          : [...prev, { day: selectedDay, meals: [mealForPlan] }];
      });

      showToast("Meal added successfully.");
    }

    setSelectedMeal(null);
  }

  /** 🔹 Remove a Meal */
  function removeMeal(id: string) {
    setLoggedMeals((prev) => prev.filter((meal) => meal.id !== id));

    setPlannedMeals((prev) =>
      prev
        .map((day) => ({
          ...day,
          meals: day.meals.filter((meal) => meal.recipeId !== id),
        }))
        .filter((day) => day.meals.length > 0)
    );

    showToast("Meal removed successfully.");
    setSelectedMeal(null);
  }

  return (
    <MealPlannerContext.Provider
      value={{
        loggedMeals,
        plannedMeals,
        selectedMeal,
        setSelectedMeal,
        selectedDay,
        setSelectedDay,
        mealCategory,
        setMealCategory,
        notes,
        setNotes,
        handleSaveOrEditMeal,
        removeMeal,
      }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
}

export function useMealPlannerContext() {
  const context = useContext(MealPlannerContext);
  if (!context) {
    throw new Error(
      "useMealPlannerContext must be used within a MealPlannerProvider"
    );
  }
  return context;
}
