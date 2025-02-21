export type Ingredient = {
  id: string;
  name: string;
  quantity?: number;
};

export type Recipe = {
  id: string;
  title: string;
  image: string;
  usedIngredients?: Ingredient[];
  missedIngredientCount?: number;
};

export type PlannedDayMeals = {
  day: string;
  meals: {
    category: "Breakfast" | "Lunch" | "Dinner" | "Snack";
    recipeId: string;
    name?: string;
    notes?: string;
  }[];
};

export type LoggedMeal = {
  id: string;
  date: string;
  category?: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  recipeId?: string;
  name?: string;
  notes?: string;
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
  id: string;
  name: string;
  category: CategoryOptions;
  quantity?: number;
};

export type AppState = {
  inventory: InventoryItem[];
  planner: PlannedDayMeals[];
  customRecipes: Recipe[];
  loggedMeals: LoggedMeal[];
};
