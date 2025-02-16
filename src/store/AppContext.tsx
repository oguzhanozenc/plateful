import React, { createContext, useContext, useState } from "react";
import { DayPlan, daysOfWeek, InventoryItem, Recipe } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const initialPlanner: DayPlan[] = daysOfWeek.map((day) => ({
  day,
  recipes: [],
}));

type AppContextProps = {
  inventory: InventoryItem[];
  planner: DayPlan[];
  addItemToInventory: (item: InventoryItem) => void;
  addRecipeToDay: (day: string, recipeName: string) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [inventory, setInventory] = useLocalStorage<InventoryItem[]>(
    "inventory",
    []
  );
  const [planner, setPlanner] = useState<DayPlan[]>(initialPlanner);

  const addItemToInventory = (item: InventoryItem) =>
    setInventory((prev) => [...prev, item]);

  const addRecipeToDay = (day: string, recipeName: string) => {
    const newRecipe: Recipe = {
      id: Date.now(),
      title: recipeName,
      ingredients: [],
      image: "https://via.placeholder.com/150",
    };

    setPlanner((prev) =>
      prev.map((plan) =>
        plan.day === day
          ? { ...plan, recipes: [...plan.recipes, newRecipe] }
          : plan
      )
    );
  };

  return (
    <AppContext.Provider
      value={{ inventory, planner, addItemToInventory, addRecipeToDay }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
