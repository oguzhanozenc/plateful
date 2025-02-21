"use client";

import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { useState } from "react";
import { LoggedMeal } from "@/types/types";
import { LucideEdit, LucideTrash } from "lucide-react";

const MAX_VISIBLE_EVENTS = 2;

export default function PlannerCell({ date }: { date: Date | null }) {
  const { loggedMeals, addMeal, removeMeal, editMeal } =
    useMealPlannerContext();
  const [newMeal, setNewMeal] = useState("");
  const [editingMeal, setEditingMeal] = useState<LoggedMeal | null>(null);
  const [editedMealName, setEditedMealName] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showAllMeals, setShowAllMeals] = useState(false);

  if (!date) return <div className="border p-2 bg-gray-100" />;

  const dateKey = date.toISOString().split("T")[0];
  const mealList: LoggedMeal[] = loggedMeals.filter(
    (meal) => meal.date === dateKey
  );
  const isToday = date.toDateString() === new Date().toDateString();

  const handleAddMeal = () => {
    if (!newMeal.trim()) return;
    addMeal({
      id: `${dateKey}-${Date.now()}`,
      date: dateKey,
      name: newMeal.trim(),
    });
    setNewMeal("");
    setIsAddDialogOpen(false);
  };

  const handleEditMeal = () => {
    if (!editingMeal || !editedMealName.trim()) return;
    editMeal(editingMeal.id, editedMealName.trim());
    setEditingMeal(null);
    setEditedMealName("");
    setIsEditDialogOpen(false);
  };

  const handleRemoveMeal = (id: string) => {
    if (confirm("Are you sure you want to delete this meal?")) {
      removeMeal(id);
    }
  };

  return (
    <div
      className={`border rounded-lg shadow-sm flex flex-col justify-between p-2 
        ${
          isToday ? "border-blue-700 bg-blue-200 font-bold" : "bg-white"
        } hover:bg-gray-50`}
    >
      <div className="flex justify-between items-center">
        <span className="text-gray-900 font-semibold">{date.getDate()}</span>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              +
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add Meal for {date.toLocaleDateString()}
              </DialogTitle>
            </DialogHeader>
            <Input
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              placeholder="Enter meal..."
            />
            <Button onClick={handleAddMeal} className="mt-3 w-full">
              Add Meal
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-1">
        {(showAllMeals ? mealList : mealList.slice(0, MAX_VISIBLE_EVENTS)).map(
          (meal) => (
            <div
              key={meal.id}
              className="bg-gray-100 px-2 py-1 rounded-md text-xs flex flex-col justify-between"
            >
              <span>{meal.name}</span>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => handleRemoveMeal(meal.id)}
                >
                  <LucideTrash size={16} />
                </Button>

                <Dialog
                  open={isEditDialogOpen}
                  onOpenChange={setIsEditDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-blue-600"
                      onClick={() => {
                        setEditingMeal(meal);
                        setEditedMealName(meal.name ?? "");
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <LucideEdit size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Meal</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={editedMealName}
                      onChange={(e) => setEditedMealName(e.target.value)}
                    />
                    <Button onClick={handleEditMeal} className="mt-3 w-full">
                      Save Changes
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )
        )}
      </div>

      {mealList.length > MAX_VISIBLE_EVENTS && (
        <Button
          variant="ghost"
          size-icon
          className="text-blue-600 hover:underline"
          onClick={() => setShowAllMeals((prev) => !prev)}
        >
          {showAllMeals
            ? "Show Less"
            : `+ ${mealList.length - MAX_VISIBLE_EVENTS} more`}
        </Button>
      )}
    </div>
  );
}
