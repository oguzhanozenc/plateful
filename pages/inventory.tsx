import React, { useState } from "react";
import { useAppContext } from "../store/AppContext";
import { CATEGORY_OPTIONS, CategoryOptions } from "../types/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusIcon, TrashIcon, EditIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FoodInventory() {
  const {
    inventory,
    removeItemFromInventory,
    handleEditItem,
    editingItem,
    newItemName,
    setNewItemName,
    newItemCategory,
    setNewItemCategory,
    handleAddOrEditItem,
    resetForm,
  } = useAppContext();

  const [showAddItem, setShowAddItem] = useState(false);

  return (
    <div className="mx-auto max-w-3xl py-12 px-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Inventory
        </h1>
        <Button
          onClick={() => {
            setShowAddItem(true);
            resetForm();
          }}
          size="icon"
          variant="default"
          className="rounded-full transition-all hover:scale-110 shadow-sm"
        >
          <PlusIcon size={20} />
        </Button>
      </div>

      {/* ADD/EDIT ITEM CARD */}
      {showAddItem && (
        <Card className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm transition-all mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              placeholder="e.g., Tomato"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring focus:border-gray-400"
            />
            <Select
              value={newItemCategory}
              onValueChange={(value) =>
                setNewItemCategory(value as CategoryOptions)
              }
            >
              <SelectTrigger className="border border-gray-300 rounded-md px-4 py-2 focus:ring focus:border-gray-400">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-all shadow-sm"
              onClick={handleAddOrEditItem}
            >
              {editingItem ? "Save Changes" : "Add Item"}
            </Button>
          </div>
        </Card>
      )}

      {/* INVENTORY LIST */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Inventory Items
        </h2>
        <div className="grid gap-3">
          {inventory.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No items yet. Click the "+" button to add one.
            </p>
          ) : (
            inventory.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all shadow-sm",
                  editingItem?.id === item.id && "ring-2 ring-gray-300"
                )}
              >
                <div className="flex gap-4 items-center">
                  {/* ITEM NAME */}
                  <span className="font-semibold text-gray-900">
                    {item.name}
                  </span>

                  {/* CATEGORY BADGE */}
                  <span
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full",
                      item.category === "Vegetable" &&
                        "bg-green-100 text-green-600",
                      item.category === "Protein" &&
                        "bg-blue-100 text-blue-600",
                      item.category === "Dairy" &&
                        "bg-yellow-100 text-yellow-600",
                      item.category === "Grain" &&
                        "bg-orange-100 text-orange-600",
                      item.category === "Other" && "bg-gray-200 text-gray-600"
                    )}
                  >
                    {item.category}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-blue-600 hover:bg-blue-100"
                    onClick={() => {
                      handleEditItem(item);
                      setShowAddItem(true);
                    }}
                  >
                    <EditIcon size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-600 hover:bg-red-100"
                    onClick={() => removeItemFromInventory(item.id)}
                  >
                    <TrashIcon size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
