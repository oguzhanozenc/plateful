"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Card, CardTitle } from "@/ui/card";
import { LoggedMeal } from "@/types/types";

type RecentActivityCardProps = {
  displayDate: string;
  fullDate: string;
  meals: LoggedMeal[];
};

export default function RecentActivityCard({
  displayDate,
  fullDate,
  meals,
}: RecentActivityCardProps) {
  const router = useRouter();

  return (
    <Card className="flex border border-neutral-300 bg-white shadow-lg hover:shadow-xl transition-shadow duration-500 ease-in-out rounded-lg p-6 flex flex-col">
      <CardTitle className="text-sm font-semibold text-neutral-800">
        {displayDate}
      </CardTitle>
      <div className="mt-2 flex flex-col gap-1 text-sm text-gray-700">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.id} className="flex items-center gap-2">
              🍽 {meal.title}
            </div>
          ))
        ) : (
          <span className="text-gray-500 italic">No meals planned yet.</span>
        )}
      </div>
      <div className="mt-3 flex justify-end">
        <Button
          variant="outline"
          className="transition-colors duration-300 ease-in-out"
          onClick={() => {
            if (!fullDate) {
              console.error("Error: fullDate is undefined");
              return;
            }
            router.push(`/planner/${fullDate}`);
          }}
        >
          View
        </Button>
      </div>
    </Card>
  );
}
