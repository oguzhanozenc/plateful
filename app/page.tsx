"use client";

import { useState } from "react";

import { Button } from "@/ui/button";
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

import FeatureCard from "@/app/components/FeatureCard";
import RecentActivityCard from "@/app/components/RecentActivityCard";

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
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const weekDates = getCurrentWeekDates();

  const { loggedMeals } = useMealPlannerContext();

  const recentDays = weekDates.map((day) => ({
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
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
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

const FEATURE_CARDS = [
  {
    title: "Manage Inventory",
    description: "Track and organize ingredients effortlessly.",
    icon: "📦",
    link: "/inventory",
    buttonText: "Manage",
  },
  {
    title: "Generate Recipes",
    description: "Get meal ideas based on your available items.",
    icon: "🥗",
    link: "/generate-recipe",
    buttonText: "Generate",
  },
  {
    title: "Planner",
    description: "Plan meals efficiently for the upcoming week.",
    icon: "📅",
    link: "/planner",
    buttonText: "Plan",
  },
];
