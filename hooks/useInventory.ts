"use client";
import { useState } from "react";
import {
  InventoryItem,
  CATEGORY_OPTIONS,
  CategoryOptions,
} from "@/types/types";

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<CategoryOptions>(
    CATEGORY_OPTIONS[0]
  );

  const resetForm = () => {
    setNewItemName("");
    setNewItemCategory(CATEGORY_OPTIONS[0]);
    setEditingItem(null);
  };

  const handleAddOrEditItem = () => {
    if (!newItemName.trim()) return;

    const item: InventoryItem = {
      id: editingItem?.id || Date.now(),
      name: newItemName,
      category: newItemCategory,
    };

    if (editingItem) {
      editItemInInventory(item);
    } else {
      addItemToInventory(item);
    }

    resetForm();
  };

  const addItemToInventory = (item: InventoryItem) => {
    setInventory((prevInventory) => [...prevInventory, item]);
  };

  const removeItemFromInventory = (id: number) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== id)
    );
  };

  const editItemInInventory = (item: InventoryItem) => {
    setInventory((prevInventory) =>
      prevInventory.map((i) =>
        i.id === item.id
          ? { ...i, name: item.name, category: item.category }
          : i
      )
    );
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setNewItemName(item.name);
    setNewItemCategory(item.category);
  };

  return {
    inventory,
    addItemToInventory,
    removeItemFromInventory,
    editItemInInventory,
    handleEditItem,
    editingItem,
    newItemName,
    setNewItemName,
    newItemCategory,
    setNewItemCategory,
    handleAddOrEditItem,
    resetForm,
  };
}
