"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";

type MealItem = {
  id: string;
  name: string;
};

export default function Page() {
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [mealName, setMealName] = useState("");

  const addMeal = () => {
    if (!mealName.trim()) return;
    setMeals([...meals, { id: `${Date.now()}`, name: mealName }]);
    setMealName("");
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-semibold tracking-tight">🍽️ Meal Planner</h1>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Input
          placeholder="Enter meal name..."
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <Button onClick={addMeal} className="bg-indigo-600 hover:bg-indigo-700">
          Add Meal
        </Button>
      </div>

      <div className="mt-6">
        {meals.length > 0 ? (
          <ul className="space-y-3">
            {meals.map((meal) => (
              <Card key={meal.id} className="p-4 shadow-sm">
                {meal.name}
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-4">No meals added yet.</p>
        )}
      </div>
    </div>
  );
}
