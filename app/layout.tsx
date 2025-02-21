"use client";

import { SidebarProvider, SidebarTrigger } from "@/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import { AppProvider } from "@/context/AppContext";
import { MealPlannerProvider } from "@/context/MealPlannerContext";
import { InventoryProvider } from "@/context/InventoryContext";
import { CalendarProvider } from "@/context/CalendarContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Plateful - Smart Meal Planning</title>
        <link rel="shortcut icon" type="image/x-icon" href="logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Plateful helps you manage ingredients, generate recipes, and plan your meals efficiently."
        />
      </head>
      <body>
        <AppProvider>
          <InventoryProvider>
            <CalendarProvider>
              <MealPlannerProvider>
                <SidebarProvider>
                  <div className="flex">
                    <AppSidebar />
                    <main className="flex-1 p-6">
                      <SidebarTrigger />
                      <ToastContainer position="top-right" autoClose={3000} />
                      {children}
                    </main>
                  </div>
                </SidebarProvider>
              </MealPlannerProvider>
            </CalendarProvider>
          </InventoryProvider>
        </AppProvider>
      </body>
    </html>
  );
}
