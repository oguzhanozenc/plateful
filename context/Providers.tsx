"use client";

import { AppProvider } from "@/context/AppContext";
import { MealPlannerProvider } from "@/context/MealPlannerContext";
import { InventoryProvider } from "@/context/InventoryContext";
import { DateProvider } from "@/context/DateContext";
import { GenerateRecipeProvider } from "@/context/GenerateRecipeContext";
import { FetchedRecipeProvider } from "./FetchedRecipeContext";
import { SidebarProvider } from "@/ui/sidebar";
import { Toaster } from "@/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <InventoryProvider>
        <DateProvider>
          <MealPlannerProvider>
            <GenerateRecipeProvider>
              <FetchedRecipeProvider>
                <SidebarProvider>
                  {children}
                  <Toaster />
                </SidebarProvider>
              </FetchedRecipeProvider>
            </GenerateRecipeProvider>
          </MealPlannerProvider>
        </DateProvider>
      </InventoryProvider>
    </AppProvider>
  );
}
