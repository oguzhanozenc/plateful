// src/pages/CreateRecipe.tsx
import { useState } from "react";
import { useAppContext } from "../store/AppContext";
import { Recipe } from "../types/types";
import { toast } from "react-toastify";

export default function CreateRecipe() {
  const { dispatch } = useAppContext();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [category, setCategory] = useState("Other");
  const [image, setImage] = useState("");

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients((prev) => [...prev, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || ingredients.length === 0) {
      toast.error("Please fill in all required fields!");
      return;
    }
    const newRecipe: Recipe = {
      id: Date.now(),
      title,
      ingredients,
      category: category as Recipe["category"],
      image,
    };
    dispatch({ type: "ADD_CUSTOM_RECIPE", payload: newRecipe });
    toast.success("Recipe added successfully!");
    setTitle("");
    setIngredients([]);
    setCategory("Other");
    setImage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white ml-64">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create a New Recipe
        </h1>
        <form className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
            />
          </div>

          {/* Ingredients Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ingredients:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add an ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Add
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="bg-gray-700 text-gray-300 px-4 py-2 rounded-md"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
            >
              <option value="Vegetable">Vegetable</option>
              <option value="Protein">Protein</option>
              <option value="Dairy">Dairy</option>
              <option value="Grain">Grain</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL:
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
