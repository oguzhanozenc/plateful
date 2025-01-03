// src/components/IngredientForm.tsx
import React from "react";

type IngredientFormProps = {
  onAddIngredient: (ingredient: string) => void;
};

export default function IngredientForm({
  onAddIngredient,
}: IngredientFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ingredient = event.currentTarget.ingredient.value.trim();
    if (ingredient) {
      onAddIngredient(ingredient);
      event.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-4 items-center">
      <input
        type="text"
        name="ingredient"
        placeholder="Enter an ingredient"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}
