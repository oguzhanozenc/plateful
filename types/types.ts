export type Recipe = {
  id: number;
  title: string;
  ingredients: string[];
  category?: CategoryOptions;
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
] as const;

export type CategoryOptions =
  | "Vegetable"
  | "Protein"
  | "Dairy"
  | "Grain"
  | "Other";

export const CATEGORY_OPTIONS: Readonly<CategoryOptions[]> = [
  "Vegetable",
  "Protein",
  "Dairy",
  "Grain",
  "Other",
];

export type InventoryItem = {
  id: number;
  name: string;
  category: CategoryOptions;
};

export type AppState = {
  inventory: InventoryItem[];
  planner: DayPlan[];
  customRecipes: Recipe[];
};
