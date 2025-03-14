// ====== Nutrition & Ingredients ======
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
  original: string;
  quantity?: number;
  unit?: string;
};

// ====== Recipes & Cooking Instructions ======
export type InstructionStep = {
  number: number;
  step: string;
};

export type Instruction = {
  name?: string;
  steps: InstructionStep[];
};

export type Recipe = {
  id: number;
  title: string;
  description?: string;
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
  extendedIngredients?: Ingredient[];
  analyzedInstructions?: Instruction[];
};

// ====== Filtering & Preferences ======
export type Filters = {
  cuisine: string;
  diet: string;
  intolerances: string;
  maxReadyTime: string;
};

// ====== Meal Planning & Logs ======
export type MealCategory = "Breakfast" | "Lunch" | "Dinner" | "Snack";

export type LoggedMeal = {
  id: string;
  date: string;
  category: MealCategory;
  title: string;
  fullRecipe: string;
  recipeId?: string;
  notes?: string;
};

export type PlannedMeal = {
  category: MealCategory;
  recipeId: string | null;
  title?: string;
  notes?: string;
  fullRecipe?: string;
};

export type PlannedDayMeals = {
  day: string;
  meals: PlannedMeal[];
};

// ====== Inventory & Categories ======
export type CategoryOptions =
  | "Vegetable"
  | "Protein"
  | "Dairy"
  | "Grain"
  | "Other";

export const CATEGORY_OPTIONS: ReadonlyArray<CategoryOptions> = [
  "Vegetable",
  "Protein",
  "Dairy",
  "Grain",
  "Other",
] as const;

export type InventoryItem = {
  id: string;
  name: string;
  category: CategoryOptions;
  quantity?: number;
};

// ====== App-Wide State ======
export type AppState = {
  inventory: InventoryItem[];
  planner: PlannedDayMeals[];
  customRecipes: Recipe[];
  loggedMeals: LoggedMeal[];
};

// ====== Planner ======
export const daysOfWeek: ReadonlyArray<string> = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

// ====== Inventory Component Props ======
export type InventoryItemProps = {
  item: InventoryItem;
  editingItem?: InventoryItem;
  handleEditItem: (item: InventoryItem) => void;
  removeItemFromInventory: (id: string) => void;
  setShowAddItem: (value: boolean) => void;
};

export type InventoryFormProps = {
  newItemName: string;
  setNewItemName: (value: string) => void;
  newItemCategory: CategoryOptions;
  setNewItemCategory: (value: CategoryOptions) => void;
  handleAddOrEditItem: () => void;
  editingItem?: InventoryItem;
};

export type InventoryListProps = {
  inventory: InventoryItem[];
  editingItem?: InventoryItem;
  handleEditItem: (item: InventoryItem) => void;
  removeItemFromInventory: (id: string) => void;
  setShowAddItem: (value: boolean) => void;
};
