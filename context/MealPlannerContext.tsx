"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { LoggedMeal, PlannedDayMeals } from "@/types/types";

type MealPlannerContextProps = {
  loggedMeals: LoggedMeal[];
  plannedMeals: PlannedDayMeals[];
  addMeal: (meal: LoggedMeal) => void;
  removeMeal: (id: string) => void;
  editMeal: (id: string, updatedMeal: Partial<LoggedMeal>) => void;
};

const MealPlannerContext = createContext<MealPlannerContextProps | undefined>(
  undefined
);

export function MealPlannerProvider({ children }: { children: ReactNode }) {
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [plannedMeals, setPlannedMeals] = useState<PlannedDayMeals[]>([]);

  const addMeal = (meal: LoggedMeal) => {
    setLoggedMeals((prev) => [...prev, meal]);

    setPlannedMeals((prev) => {
      if (!Array.isArray(prev)) return prev;

      const existingDay = prev.find((day) => day.day === meal.date);

      const mealForPlan = {
        category: meal.category!,
        recipeId: meal.recipeId!,
        name: meal.name,
        notes: meal.notes,
      };

      if (existingDay) {
        return prev.map((day) =>
          day.day === meal.date
            ? {
                ...day,
                meals: [...day.meals, mealForPlan],
              }
            : day
        );
      } else {
        return [...prev, { day: meal.date, meals: [mealForPlan] }];
      }
    });
  };

  const removeMeal = (id: string) => {
    setLoggedMeals((prev) => prev.filter((meal) => meal.id !== id));

    setPlannedMeals((prev) => {
      if (!Array.isArray(prev)) return prev;
      return prev
        .map((day) => ({
          ...day,
          meals: day.meals.filter((meal) => meal.recipeId !== Number(id)),
        }))
        .filter((day) => day.meals.length > 0);
    });
  };

  const editMeal = (id: string, updatedMeal: Partial<LoggedMeal>) => {
    setLoggedMeals((prev) =>
      prev.map((meal) => (meal.id === id ? { ...meal, ...updatedMeal } : meal))
    );

    setPlannedMeals((prev) => {
      if (!Array.isArray(prev)) return prev;
      return prev.map((day) => ({
        ...day,
        meals: day.meals.map((meal) =>
          meal.recipeId === Number(id)
            ? {
                category: updatedMeal.category ?? meal.category,
                recipeId: updatedMeal.recipeId ?? meal.recipeId,
                name: updatedMeal.name ?? meal.name,
                notes: updatedMeal.notes ?? meal.notes,
              }
            : meal
        ),
      }));
    });
  };

  return (
    <MealPlannerContext.Provider
      value={{ loggedMeals, plannedMeals, addMeal, removeMeal, editMeal }}
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
