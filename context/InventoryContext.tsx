"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  InventoryItem,
  CATEGORY_OPTIONS,
  CategoryOptions,
} from "@/types/types";

type InventoryContextProps = {
  inventory: InventoryItem[];
  addItemToInventory: (item: InventoryItem) => void;
  removeItemFromInventory: (id: string) => void;
  editItemInInventory: (item: InventoryItem) => void;
  handleEditItem: (item: InventoryItem) => void;
  resetForm: () => void;
  editingItem: InventoryItem | null;
  newItemName: string;
  setNewItemName: (name: string) => void;
  newItemCategory: CategoryOptions;
  setNewItemCategory: (category: CategoryOptions) => void;
  handleAddOrEditItem: () => void;
};

const InventoryContext = createContext<InventoryContextProps | undefined>(
  undefined
);

export function InventoryProvider({ children }: { children: ReactNode }) {
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
      id: editingItem?.id || Date.now().toString(),
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

  const removeItemFromInventory = (id: string) => {
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

  return (
    <InventoryContext.Provider
      value={{
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
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventoryContext() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "useInventoryContext must be used within an InventoryProvider"
    );
  }
  return context;
}
