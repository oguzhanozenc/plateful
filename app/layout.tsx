import { Geist, EB_Garamond } from "next/font/google";
import { AppSidebar } from "@/app/components/AppSidebar";
import { AppProvider } from "@/context/AppContext";
import { MealPlannerProvider } from "@/context/MealPlannerContext";
import { InventoryProvider } from "@/context/InventoryContext";
import { CalendarProvider } from "@/context/CalendarContext";
import "@/styles/global.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${garamond.variable}`}>
      <head>
        <title>Plateful - Smart Meal Planning</title>
        <link rel="shortcut icon" type="image/x-icon" href="logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Plateful helps you manage ingredients, generate recipes, and plan your meals efficiently."
        />
      </head>
      <body className="min-h-screen flex font-sans">
        <AppProvider>
          <InventoryProvider>
            <CalendarProvider>
              <MealPlannerProvider>
                <div className="flex min-h-screen w-full">
                  <aside className="transition-all duration-300">
                    <AppSidebar />
                  </aside>
                  <main className="flex-1 min-w-0 p-6 transition-all duration-300">
                    {children}
                  </main>
                </div>
              </MealPlannerProvider>
            </CalendarProvider>
          </InventoryProvider>
        </AppProvider>
      </body>
    </html>
  );
}
