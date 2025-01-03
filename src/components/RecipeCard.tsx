// src/components/RecipeCard.tsx

import { Recipe } from "../types/types";

type RecipeCardProps = {
  recipe: Recipe;
  disabled?: boolean;
  buttonLabel?: string;
  onClick?: () => void;
};

export default function RecipeCard({
  recipe,
  disabled = false,
  buttonLabel = "Add to Planner",
  onClick,
}: RecipeCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-medium text-gray-100">{recipe.title}</h3>
      {recipe.calories && (
        <p className="text-sm text-gray-400 mb-4">{recipe.calories} calories</p>
      )}
      <button
        disabled={disabled}
        onClick={onClick}
        className={`w-full px-4 py-2 text-white rounded-md transition ${
          disabled
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
