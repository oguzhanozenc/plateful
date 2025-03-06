"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { LoggedMeal, PlannedDayMeals } from "@/types/types";

type MealPlannerContextProps = {
  loggedMeals: LoggedMeal[];
  plannedMeals: PlannedDayMeals[];
  addMeal: (meal: LoggedMeal) => void;
  removeMeal: (id: string) => void;
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
      const existingDay = prev.find((day) => day.day === meal.date);
      if (existingDay) {
        return prev.map((day) =>
          day.day === meal.date ? { ...day, meals: [...day.meals, meal] } : day
        );
      } else {
        return [...prev, { day: meal.date, meals: [meal] }];
      }
    });
  };

  const removeMeal = (id: string) => {
    setLoggedMeals((prev) => prev.filter((meal) => meal.id !== id));
    setPlannedMeals((prev) =>
      prev.map((day) => ({
        ...day,
        meals: day.meals.filter((meal) => meal.id !== id),
      }))
    );
  };

  return (
    <MealPlannerContext.Provider
      value={{ loggedMeals, plannedMeals, addMeal, removeMeal }}
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
