// src/pages/GenerateRecipe.tsx

import { useState } from "react";
import { useAppContext } from "../store/AppContext";
import { mockRecipes } from "../api/mockAPI";
import { Recipe } from "../types/types";
import { toast } from "react-toastify";

export default function GenerateRecipe() {
  const { state, dispatch } = useAppContext();
  const { planner, inventory } = state;

  // Ingredients that the user has selected (we store them in lowercase).
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // A custom ingredient typed by the user.
  const [newIngredient, setNewIngredient] = useState("");

  // The list of recipes that match the selected ingredients.
  const [matchingRecipes, setMatchingRecipes] = useState<Recipe[]>([]);

  // --- Modal-Related States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  const [modalDay, setModalDay] = useState("");

  /** Toggle ingredient from inventory (case-insensitive). */
  const handleToggleIngredient = (ingredient: string) => {
    const normalized = ingredient.toLowerCase();
    setSelectedIngredients((prev) =>
      prev.includes(normalized)
        ? prev.filter((ing) => ing !== normalized)
        : [...prev, normalized]
    );
  };

  /** Add a custom ingredient typed by the user (also in lowercase). */
  const handleAddNewIngredient = () => {
    const trimmed = newIngredient.trim().toLowerCase();
    if (trimmed && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients((prev) => [...prev, trimmed]);
      setNewIngredient("");
    }
  };

  /** Generate recipes that share at least one of the selected ingredients. */
  const handleGenerateRecipes = () => {
    const lowerSelected = selectedIngredients.map((ing) => ing.toLowerCase());

    const filtered = mockRecipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        lowerSelected.includes(ingredient.toLowerCase())
      )
    );

    setMatchingRecipes(filtered);

    console.log("Selected Ingredients:", selectedIngredients);
    console.log("Filtered Recipes:", filtered);
  };

  /**
   * When user clicks "Assign to Day," we open a modal with day selection.
   */
  const handleOpenModal = (recipe: Recipe) => {
    setModalRecipe(recipe);
    setModalDay(""); // reset selection
    setIsModalOpen(true);
  };

  /**
   * Close the modal (without assigning).
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalRecipe(null);
    setModalDay("");
  };

  /**
   * Confirm assignment inside modal.
   * 1) Checks if a day is selected.
   * 2) Checks if recipe is already on that day.
   * 3) If fine, dispatch to store and close modal.
   */
  const handleConfirmAssignment = () => {
    if (!modalDay) {
      toast.error("Please select a day first!");
      return;
    }

    if (!modalRecipe) {
      // Edge case: no recipe selected
      toast.error("No recipe is selected.");
      return;
    }

    // Check if recipe is already on the chosen day
    const dayPlan = planner.find((plan) => plan.day === modalDay);
    if (dayPlan && dayPlan.recipes.some((r) => r.id === modalRecipe.id)) {
      toast.warning(`"${modalRecipe.title}" is already on ${modalDay}!`);
      return;
    }

    // Dispatch to global store
    dispatch({
      type: "ADD_RECIPE_TO_DAY",
      payload: { day: modalDay, recipe: modalRecipe },
    });
    toast.success(`Recipe "${modalRecipe.title}" assigned to ${modalDay}.`);

    // Finally, close modal
    handleCloseModal();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 ml-64">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Recipe Generator</h1>

        {/* Inventory Grid: select items */}
        <h2 className="text-xl font-semibold mb-4">Select from Inventory</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {inventory.map((item) => {
            const isSelected = selectedIngredients.includes(
              item.name.toLowerCase()
            );
            return (
              <div
                key={item.id}
                onClick={() => handleToggleIngredient(item.name)}
                className={`cursor-pointer p-4 rounded-lg shadow-md text-center border ${
                  isSelected
                    ? "bg-blue-700 border-blue-300"
                    : "bg-gray-700 border-gray-500"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            );
          })}
        </div>

        {/* Add custom ingredient */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Custom Ingredient</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Enter ingredient"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-500 text-white rounded-md"
            />
            <button
              onClick={handleAddNewIngredient}
              className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600"
            >
              Add Ingredient
            </button>
          </div>
        </div>

        {/* Selected Ingredients */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Selected Ingredients</h2>
          <ul className="list-disc pl-5 space-y-2">
            {selectedIngredients.map((ingredient, index) => (
              <li
                key={index}
                className="text-sm bg-gray-700 rounded-md px-2 py-1"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Generate Recipes */}
        <button
          onClick={handleGenerateRecipes}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md mb-6 hover:bg-blue-700"
        >
          Find Matching Recipes
        </button>

        {/* Matching Recipes */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Matching Recipes</h2>
          {matchingRecipes.length === 0 ? (
            <p className="text-gray-400">
              No matching recipes found. Try adding more ingredients.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {matchingRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-gray-700 border border-gray-500 rounded-lg shadow-md p-4"
                >
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {recipe.description}
                  </p>
                  <button
                    onClick={() => handleOpenModal(recipe)}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Assign to Day
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Assign "{modalRecipe.title}" to Day
            </h3>
            <select
              value={modalDay}
              onChange={(e) => setModalDay(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white rounded-md mb-4"
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
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
