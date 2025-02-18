"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { InventoryItem, CategoryOptions } from "@/types/types";
import { useInventory } from "@/hooks/useInventory";

type AppContextProps = {
  inventory: InventoryItem[];
  addItemToInventory: (item: InventoryItem) => void;
  removeItemFromInventory: (id: number) => void;
  editItemInInventory: (item: InventoryItem) => void;
  handleEditItem: (item: InventoryItem) => void;
  editingItem: InventoryItem | null;
  newItemName: string;
  setNewItemName: (name: string) => void;
  newItemCategory: CategoryOptions;
  setNewItemCategory: (category: CategoryOptions) => void;
  handleAddOrEditItem: () => void;
  resetForm: () => void;
};

const InventoryContext = createContext<AppContextProps | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const inventoryContext = useInventory();

  return (
    <InventoryContext.Provider value={inventoryContext}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
