// src/components/IngredientInput.tsx
import { useState } from "react";

type IngredientInputProps = {
  onAddIngredient: (ingredient: string) => void;
};

export default function IngredientInput({
  onAddIngredient,
}: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddIngredient(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Quickly add an ingredient"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}
