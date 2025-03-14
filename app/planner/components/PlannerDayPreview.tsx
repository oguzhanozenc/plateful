"use client";

import { useRouter } from "next/navigation";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { useDateContext } from "@/context/DateContext";
import { LucidePlus } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/ui/tooltip";

export default function PlannerDayPreview({ date }: { date: Date | null }) {
  const router = useRouter();
  const { loggedMeals } = useMealPlannerContext();
  const { getLocalYyyyMmDd } = useDateContext();

  if (!date) return <div className="border p-2 bg-gray-100 rounded-lg"></div>;

  const dateKey = getLocalYyyyMmDd(date);
  const mealList = loggedMeals.filter((meal) => meal.date === dateKey);
  const isToday = dateKey === getLocalYyyyMmDd(new Date());

  return (
    <div
      className={`border rounded-lg shadow-sm flex flex-col justify-between p-2 aspect-square cursor-pointer relative
          ${isToday ? "border-blue-700 bg-blue-200 font-bold" : "bg-white"}
          hover:bg-gray-50 w-full h-full`}
      onClick={() => router.push(`/planner/${dateKey}`)} // ✅ Navigates instead of opening modal
    >
      <span className="text-gray-900 font-semibold">{date.getDate()}</span>

      {mealList.length > 0 ? (
        <div className="flex flex-col gap-1 mt-2 flex-grow">
          {mealList.slice(0, 3).map((meal) => (
            <TooltipProvider key={meal.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-gray-100 px-2 py-1 rounded-md text-xs truncate text-left w-full hover:bg-gray-200 transition">
                    {meal.title.length > 40
                      ? `${meal.title.substring(0, 40)}...`
                      : meal.title}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{meal.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-grow">
          <LucidePlus size={16} />
        </div>
      )}
    </div>
  );
}
