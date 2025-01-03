// src/pages/Recipes.tsx
import { useState, useEffect } from "react";
import { useAppContext } from "../store/AppContext";
import { Recipe } from "../types/types";
import RecipeCard from "../components/RecipeCard";
import { toast } from "react-toastify";

export default function Recipes() {
  const { state, dispatch } = useAppContext();
  const { customRecipes } = state; // from global store
  // You can also merge `mockRecipes` if you want
  // or keep them in the store as well, etc.

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);

  // Example: combine mockRecipes + customRecipes
  useEffect(() => {
    import("../api/mockAPI").then(({ mockRecipes }) => {
      setAllRecipes([...mockRecipes, ...customRecipes]);
    });
  }, [customRecipes]);

  // Here you could filter recommended based on "recentIngredients", etc.
  // For demonstration, we'll just show all in "recommended" for now.
  useEffect(() => {
    setRecommendedRecipes(allRecipes.slice(0, 3)); // take first 3 as "recommended"
  }, [allRecipes]);

  const handleAddToPlanner = (recipe: Recipe) => {
    if (!selectedDay) {
      toast.error("Please select a day before adding!");
      return;
    }
    dispatch({
      type: "ADD_RECIPE_TO_DAY",
      payload: { day: selectedDay, recipe },
    });
    toast.success(`${recipe.title} added to ${selectedDay}!`);
  };

  return (
    <div className="flex flex-col lg:flex-row ml-64 bg-gray-900 text-white p-6 min-h-screen">
      <div className="flex-1 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Recommended Recipes</h1>

          {/* Day Selector */}
          <label className="block text-sm font-medium text-gray-300 mb-6">
            Select a Day:
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="block w-full mt-2 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md"
            >
              <option value="">Select a Day</option>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>

          {/* Recommended Recipes */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              Recommendations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRecipes.length > 0 ? (
                recommendedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    disabled={!selectedDay}
                    buttonLabel="Add to Planner"
                    onClick={() => handleAddToPlanner(recipe)}
                  />
                ))
              ) : (
                <p className="text-gray-400">
                  No recommendations available. Add more ingredients to see
                  suggestions!
                </p>
              )}
            </div>
          </div>

          {/* All Recipes */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              All Recipes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  disabled={!selectedDay}
                  buttonLabel="Add to Planner"
                  onClick={() => handleAddToPlanner(recipe)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
