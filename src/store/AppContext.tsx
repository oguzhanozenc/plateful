import React, { createContext, useContext, useReducer, useEffect } from "react";
import { DayPlan, daysOfWeek, InventoryItem, Recipe } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type AppState = {
  inventory: InventoryItem[];
  planner: DayPlan[];
  customRecipes: Recipe[];
};

type AppAction =
  | { type: "ADD_ITEM_TO_INVENTORY"; payload: InventoryItem }
  | { type: "SET_PLANNER"; payload: DayPlan[] }
  | { type: "ADD_RECIPE_TO_DAY"; payload: { day: string; recipe: Recipe } }
  | { type: "ADD_CUSTOM_RECIPE"; payload: Recipe }
  | {
      type: "REPLACE_RECIPE";
      payload: { day: string; recipeIndex: number; newRecipe: Recipe };
    }
  | { type: "REMOVE_RECIPE"; payload: { day: string; recipeIndex: number } };

// Initial state
const initialPlanner = daysOfWeek.map((day) => ({ day, recipes: [] }));
const initialState: AppState = {
  inventory: [],
  planner: initialPlanner,
  customRecipes: [],
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_ITEM_TO_INVENTORY":
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };

    case "SET_PLANNER":
      return {
        ...state,
        planner: action.payload,
      };

    case "ADD_RECIPE_TO_DAY": {
      const { day, recipe } = action.payload;
      return {
        ...state,
        planner: state.planner.map((plan) => {
          // Only adjust the matching day
          if (plan.day !== day) return plan;

          // If the recipe is already on that day, do nothing
          const alreadyExists = plan.recipes.some((r) => r.id === recipe.id);
          if (alreadyExists) {
            return plan; // No changes
          }

          // Otherwise, add the recipe
          return {
            ...plan,
            recipes: [...plan.recipes, recipe],
          };
        }),
      };
    }

    case "ADD_CUSTOM_RECIPE":
      return {
        ...state,
        customRecipes: [...state.customRecipes, action.payload],
      };

    case "REMOVE_RECIPE":
      return {
        ...state,
        planner: state.planner.map((plan) =>
          plan.day === action.payload.day
            ? {
                ...plan,
                recipes: plan.recipes.filter(
                  (_, idx) => idx !== action.payload.recipeIndex
                ),
              }
            : plan
        ),
      };

    case "REPLACE_RECIPE":
      return {
        ...state,
        planner: state.planner.map((plan) =>
          plan.day === action.payload.day
            ? {
                ...plan,
                recipes: plan.recipes.map((r, idx) =>
                  idx === action.payload.recipeIndex
                    ? action.payload.newRecipe
                    : r
                ),
              }
            : plan
        ),
      };

    default:
      return state;
  }
}

// Context creation
type AppContextProps = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

// Provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [persistedState, setPersistedState] = useLocalStorage<AppState>(
    "appState",
    initialState
  );

  // useReducer with the persisted state as initial
  const [state, dispatch] = useReducer(appReducer, persistedState);

  // Whenever our state changes, sync it to localStorage
  useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to access
export function useAppContext() {
  return useContext(AppContext);
}
