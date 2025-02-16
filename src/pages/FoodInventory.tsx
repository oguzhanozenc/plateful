import { useState } from "react";
import { useAppContext } from "../store/AppContext";
import { InventoryItem } from "../types/types";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function FoodInventory() {
  const { state, addItemToInventory } = useAppContext();
  const { inventory } = state;

  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemCategory, setNewItemCategory] =
    useState<InventoryItem["category"]>("Vegetable");
  const [newItemImage, setNewItemImage] = useState<string>("");

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast.error("Item name cannot be empty!");
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory,
      image: newItemImage || "https://via.placeholder.com/150",
    };

    addItemToInventory(newItem);
    toast.success("Item added successfully!");

    setNewItemName("");
    setNewItemCategory("Vegetable");
    setNewItemImage("");
  };

  return (
    <div className="mx-auto max-w-6xl py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#3c692c] mb-6">Food Inventory</h1>

      {/* Add New Item */}
      <Card className="p-6 shadow-md mb-6">
        <CardTitle className="text-xl font-semibold mb-4">
          Add New Item
        </CardTitle>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <Input
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />

            <Select
              value={newItemCategory}
              onValueChange={(value) =>
                setNewItemCategory(value as InventoryItem["category"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {["Vegetable", "Protein", "Dairy", "Grain", "Other"].map(
                  (category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Input
              placeholder="Image URL (optional)"
              value={newItemImage}
              onChange={(e) => setNewItemImage(e.target.value)}
            />

            <Button
              className="col-span-1 sm:col-span-3 bg-[#3c692c] hover:bg-[#519339] text-white"
              onClick={handleAddItem}
            >
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Display Inventory */}
      <Card className="p-6 shadow-md">
        <CardTitle className="text-xl font-semibold mb-4">
          Inventory Items
        </CardTitle>
        <CardContent>
          {inventory.length === 0 ? (
            <p className="text-gray-500">
              No items in inventory. Add some items to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {inventory.map((item: InventoryItem) => (
                <Card key={item.id} className="shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <CardContent>
                    <CardTitle className="text-lg font-semibold">
                      {item.name}
                    </CardTitle>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
