"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardTitle } from "@/ui/card";
import PlannerView from "@/app/planner/page";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { LoggedMeal } from "@/types/types";

const getCurrentWeekDates = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    return {
      fullDate: date.toISOString().split("T")[0],
      formattedDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });
};

export default function Home() {
  const [isPlannerOpen, setIsPlannerOpen] = useState<boolean>(false);
  const { loggedMeals } = useMealPlannerContext() as {
    loggedMeals: LoggedMeal[];
  };
  const [showAll, setShowAll] = useState<boolean>(false);

  const recentDays = getCurrentWeekDates().map((day) => ({
    ...day,
    meals: loggedMeals.filter((meal) => meal.date === day.fullDate),
  }));

  return (
    <div className="mx-auto max-w-5xl py-16 px-6 space-y-14">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Dashboard
        </h1>
        <Dialog open={isPlannerOpen} onOpenChange={setIsPlannerOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-black hover:bg-neutral-950 text-white rounded-lg shadow-lg">
              <PlusIcon size={16} />
              New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full">
            <DialogHeader>
              <DialogTitle>Meal Planner</DialogTitle>
            </DialogHeader>
            <PlannerView />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="Manage Inventory"
          description="Track and organize ingredients effortlessly."
          icon="📦"
          link="/inventory"
          buttonText="Manage"
        />
        <FeatureCard
          title="Generate Recipes"
          description="Get meal ideas based on your available items."
          icon="🥗"
          link="/generate-recipe"
          buttonText="Generate"
        />
        <FeatureCard
          title="Planner"
          description="Plan meals efficiently for the upcoming week."
          icon="📅"
          link="/planner"
          buttonText="Plan"
        />
      </div>

      <h2 className="text-xl font-semibold text-neutral-800 mb-3">
        Recent Activity
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(showAll ? recentDays : recentDays.slice(0, 3)).map(
          ({ fullDate, formattedDate, meals }) => (
            <RecentActivityCard
              key={fullDate}
              displayDate={formattedDate}
              meals={meals}
            />
          )
        )}
      </div>

      {recentDays.length > 3 && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  link: string;
  buttonText: string;
};

function FeatureCard({
  title,
  description,
  icon,
  link,
  buttonText,
}: FeatureCardProps) {
  return (
    <Card className="border border-neutral-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <CardTitle className="text-neutral-900 text-lg font-semibold leading-tight">
            {title}
          </CardTitle>
          <p className="text-neutral-700 text-sm leading-snug">{description}</p>
        </div>
      </div>
      <div className="flex justify-end mt-auto">
        <Link href={link} passHref>
          <Button className="px-5 py-2.5 text-sm font-medium bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 text-white rounded-lg transition-all">
            {buttonText}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

type RecentActivityCardProps = {
  displayDate: string;
  meals: LoggedMeal[];
};

function RecentActivityCard({ displayDate, meals }: RecentActivityCardProps) {
  return (
    <Card className="border border-neutral-300 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6 flex flex-col">
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
