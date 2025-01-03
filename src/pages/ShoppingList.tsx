// src/pages/ShoppingList.tsx
import { useAppContext } from "../store/AppContext";
import { useEffect, useState } from "react";

export default function ShoppingList() {
  const { state, dispatch } = useAppContext();
  const { planner, inventory } = state;

  const [shoppingList, setShoppingList] = useState<string[]>([]);

  useEffect(() => {
    // Re-generate shopping list from planner vs inventory
    const requiredIngredients = planner.flatMap((plan) =>
      plan.recipes.flatMap((recipe) => recipe.ingredients)
    );
    const uniqueIngredients = Array.from(new Set(requiredIngredients));
    const missingIngredients = uniqueIngredients.filter(
      (ingredient) => !inventory.some((item) => item.name === ingredient)
    );
    setShoppingList(missingIngredients);
  }, [planner, inventory]);

  const markAsBought = (ingredient: string) => {
    // "Buying" means adding it to inventory
    dispatch({
      type: "ADD_ITEM_TO_INVENTORY",
      payload: {
        id: Date.now(),
        name: ingredient,
        category: "Other",
        image: "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-6 px-4 ml-64">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Shopping List</h1>

        {/* Conditional Rendering for Shopping List */}
        {shoppingList.length === 0 ? (
          <p className="text-gray-400 text-center">
            No items in your shopping list!
          </p>
        ) : (
          <ul className="space-y-4">
            {shoppingList.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4"
              >
                <span className="text-lg font-medium text-gray-100">
                  {ingredient}
                </span>
                <button
                  onClick={() => markAsBought(ingredient)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
                >
                  Mark as Bought
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
