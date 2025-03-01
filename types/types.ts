export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

export type Nutrition = {
  nutrients: Nutrient[];
};

export type Ingredient = {
  id: number;
  name: string;
  quantity?: number;
  unit?: string;
};

export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  cuisines?: string[];
  diets?: string[];
  intolerances?: string[];
  summary?: string;
  usedIngredients?: Ingredient[];
  missedIngredients?: Ingredient[];
  missedIngredientCount?: number;
  healthScore?: number;
  aggregateLikes?: number;
  nutrition?: Nutrition;
};

export type Filters = {
  cuisine: string;
  diet: string;
  intolerances: string;
  maxReadyTime: string;
};

export type PlannedDayMeals = {
  day: string;
  meals: {
    category: "Breakfast" | "Lunch" | "Dinner" | "Snack";
    recipeId: number;
    name?: string;
    notes?: string;
  }[];
};

export type LoggedMeal = {
  id: string;
  date: string;
  category?: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  recipeId?: number;
  name?: string;
  notes?: string;
};

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
