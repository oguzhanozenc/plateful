// src/pages/FoodInventory.tsx
import { useState } from "react";
import { useAppContext } from "../store/AppContext";
import { InventoryItem } from "../types/types";
import { toast } from "react-toastify";

export default function FoodInventory() {
  const { state, dispatch } = useAppContext();
  const { inventory } = state;

  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Vegetable");
  const [newItemImage, setNewItemImage] = useState("");

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast.error("Item name cannot be empty!");
      return;
    }
    const newItem: InventoryItem = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory as InventoryItem["category"],
      image: newItemImage || "https://via.placeholder.com/150",
    };
    dispatch({ type: "ADD_ITEM_TO_INVENTORY", payload: newItem });
    toast.success("Item added successfully!");
    setNewItemName("");
    setNewItemCategory("Vegetable");
    setNewItemImage("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 ml-64">
      {/* ml-64 to accommodate fixed sidebar (Navbar) */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Food Inventory</h1>

        {/* Add New Item Section */}
        <div className="bg-gray-700 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <input
              type="text"
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-md shadow-sm"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-md shadow-sm"
            >
              <option value="Vegetable">Vegetable</option>
              <option value="Protein">Protein</option>
              <option value="Dairy">Dairy</option>
              <option value="Grain">Grain</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newItemImage}
              onChange={(e) => setNewItemImage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-md shadow-sm"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="col-span-1 sm:col-span-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Inventory List Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
          {inventory.length === 0 ? (
            <p className="text-gray-400">
              No items in inventory. Add some items to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-700 border border-gray-600 rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
