"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { LoggedMeal } from "@/types/types";

type MealPlannerContextProps = {
  loggedMeals: LoggedMeal[];
  addMeal: (meal: LoggedMeal) => void;
  editMeal: (id: string, newName: string) => void;
  removeMeal: (id: string) => void;
};

const MealPlannerContext = createContext<MealPlannerContextProps | undefined>(
  undefined
);

export function MealPlannerProvider({ children }: { children: ReactNode }) {
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);

  const addMeal = (meal: LoggedMeal) => {
    setLoggedMeals((prev) => [...prev, meal]);
  };

  const editMeal = (id: string, newName: string) => {
    setLoggedMeals((prev) =>
      prev.map((meal) => (meal.id === id ? { ...meal, name: newName } : meal))
    );
  };

  const removeMeal = (id: string) => {
    setLoggedMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  return (
    <MealPlannerContext.Provider
      value={{ loggedMeals, addMeal, editMeal, removeMeal }}
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
