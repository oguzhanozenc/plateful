// src/pages/WeeklyPlanner.tsx
import { useState } from "react";
import { useAppContext } from "../store/AppContext";
import { mockRecipes } from "../api/mockAPI";
import { Recipe } from "../types/types";
import { toast } from "react-toastify";

export default function WeeklyPlanner() {
  const { state, dispatch } = useAppContext();
  const { planner } = state;

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    day: "",
    recipeIndex: -1,
    action: "remove" as "remove" | "replace",
  });
  const [replacementRecipe, setReplacementRecipe] = useState<Recipe | null>(
    null
  );

  const openModal = (
    day: string,
    recipeIndex: number,
    action: "remove" | "replace"
  ) => {
    setConfirmModal({ open: true, day, recipeIndex, action });
  };

  const closeModal = () => {
    setConfirmModal({
      open: false,
      day: "",
      recipeIndex: -1,
      action: "remove",
    });
    setReplacementRecipe(null);
  };

  const handleRemoveRecipe = () => {
    dispatch({
      type: "REMOVE_RECIPE",
      payload: {
        day: confirmModal.day,
        recipeIndex: confirmModal.recipeIndex,
      },
    });
    toast.success("Recipe removed!");
    closeModal();
  };

  const handleReplaceRecipe = () => {
    if (!replacementRecipe) return;
    dispatch({
      type: "REPLACE_RECIPE",
      payload: {
        day: confirmModal.day,
        recipeIndex: confirmModal.recipeIndex,
        newRecipe: replacementRecipe,
      },
    });
    toast.success("Recipe replaced!");
    closeModal();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 ml-64">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold mb-6">Weekly Planner</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {planner.map((plan) => (
            <div
              key={plan.day}
              className="bg-gray-800 shadow-lg rounded-lg p-6 text-center"
            >
              <h2 className="text-xl font-semibold mb-4">{plan.day}</h2>
              <ul className="space-y-4">
                {plan.recipes.map((recipe, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 rounded-md p-4 flex justify-between items-center"
                  >
                    <span className="text-sm">{recipe.title}</span>
                    <div className="flex space-x-2">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => openModal(plan.day, index, "remove")}
                      >
                        Remove
                      </button>
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => openModal(plan.day, index, "replace")}
                      >
                        Replace
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              {confirmModal.action === "remove"
                ? "Confirm Removal"
                : "Select Replacement Recipe"}
            </h3>

            {confirmModal.action === "replace" && (
              <select
                onChange={(e) =>
                  setReplacementRecipe(
                    mockRecipes.find((r) => r.title === e.target.value) || null
                  )
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white rounded-md"
              >
                <option value="">Select a Recipe</option>
                {mockRecipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.title}>
                    {recipe.title}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md text-white ${
                  confirmModal.action === "remove"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={
                  confirmModal.action === "remove"
                    ? handleRemoveRecipe
                    : handleReplaceRecipe
                }
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
