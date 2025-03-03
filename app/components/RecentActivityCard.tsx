"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardTitle } from "@/ui/card";
import { LoggedMeal } from "@/types/types";

type RecentActivityCardProps = {
  displayDate: string;
  meals: LoggedMeal[];
};

export default function RecentActivityCard({
  displayDate,
  meals,
}: RecentActivityCardProps) {
  return (
    <Card className="flex border border-neutral-300 bg-white shadow-lg hover:shadow-xl transition-shadow duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] rounded-lg p-6 flex flex-col">
      <CardTitle className="text-sm font-semibold text-neutral-800">
        {displayDate}
      </CardTitle>
      <div className="mt-2 flex flex-col gap-1 text-sm text-gray-700">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.id} className="flex items-center gap-2">
              🍽 {meal.name}
            </div>
          ))
        ) : (
          <span className="text-gray-500 italic">No meals planned yet.</span>
        )}
      </div>
      <div className="mt-3 flex justify-end">
        <Link href="/planner" passHref>
          <Button className="px-5 py-2.5 text-sm font-medium bg-neutral-200 hover:bg-neutral-300 border border-neutral-400 text-neutral-800 rounded-lg">
            View
          </Button>
        </Link>
      </div>
    </Card>
  );
}
