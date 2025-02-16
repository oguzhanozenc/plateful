export type Recipe = {
  id: number;
  title: string;
  ingredients: string[];
  category?: "Vegetable" | "Protein" | "Dairy" | "Grain" | "Other";
  image: string;
  calories?: number;
  description?: string;
  tags?: string[];
};

export type DayPlan = {
  day: string;
  recipes: Recipe[];
};

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type InventoryItem = {
  id: number;
  name: string;
  category: "Vegetable" | "Protein" | "Dairy" | "Grain" | "Other";
  image: string;
};

export type AppState = {
  inventory: InventoryItem[];
  planner: DayPlan[];
  customRecipes: Recipe[];
};
