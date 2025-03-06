"use client";

import { useState } from "react";

import { Button } from "@/ui/button";
import PlannerView from "@/app/planner/page";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

import Title from "@/app/components/Title";
import FeatureCard from "@/app/components/FeatureCard";
import RecentActivityCard from "@/app/components/RecentActivityCard";

function getLocalYyyyMmDd(date: Date): string {
  const tzOffset = date.getTimezoneOffset();
  const localTime = new Date(date.getTime() - tzOffset * 60_000);
  return localTime.toISOString().split("T")[0]; // Örn: "2025-03-07"
}

function getCurrentWeekDates() {
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);

    return {
      fullDate: getLocalYyyyMmDd(date),
      formattedDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });
}

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
    <div className="mx-auto w-full min-wfull max-w-full h-full min-h-screen py-16 px-6 space-y-14">
      <div className="flex md:flex-row justify-between items-center mb-10 gap-4">
        <Title>Dashboard</Title>

        <Dialog open={isPlannerOpen} onOpenChange={setIsPlannerOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-black hover:bg-neutral-950 text-white rounded-lg shadow-lg">
              <Sparkles size={16} />
              Generate Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full">
            <DialogHeader>
              <DialogTitle>Meal Planner</DialogTitle>
            </DialogHeader>
            <div className="flex max-w-screen max-h-screen overflow-y-auto">
              <PlannerView />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>

      <Title className="text-2xl text-neutral-800 mb-1">Recent Activity</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
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
