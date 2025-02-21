"use client";

import { Button } from "@/ui/button";
import { LoggedMeal } from "@/types/types";

export default function MealEntry({
  meal,
  onEdit,
  onDelete,
}: {
  meal: LoggedMeal;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="text-xs px-2 py-1 rounded-md flex justify-between items-center bg-gray-100 text-gray-900">
      <span>{meal.name}</span>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size-4
          className="text-blue-600 hover:bg-blue-100"
          onClick={() => {
            const newName = prompt("Edit meal:", meal.name ?? "") ?? "";
            onEdit(meal.id, newName);
          }}
        >
          ✏️
        </Button>
        <Button
          variant="ghost"
          size-4
          className="text-red-600 hover:bg-red-100"
          onClick={() => onDelete(meal.id)}
        >
          🗑
        </Button>
      </div>
    </div>
  );
}
