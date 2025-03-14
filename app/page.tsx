"use client";

import { useState, useMemo } from "react";
import { Button } from "@/ui/button";
import { useMealPlannerContext } from "@/context/MealPlannerContext";
import { useDateContext } from "@/context/DateContext";

import Title from "@/app/components/Title";
import FeatureCard from "@/app/components/FeatureCard";
import RecentActivityCard from "@/app/components/RecentActivityCard";
import GenerateRecipeModal from "@/app/components/GenerateRecipeModal";

export default function Dashboard() {
  const [showAll, setShowAll] = useState(false);

  const { loggedMeals = [] } = useMealPlannerContext();
  const { getCurrentWeekDates } = useDateContext();

  const recentDays = useMemo(
    () =>
      getCurrentWeekDates().map((day) => ({
        ...day,
        meals: loggedMeals.filter((meal) => meal.date === day.fullDate),
      })),
    [loggedMeals, getCurrentWeekDates]
  );

  return (
    <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 py-6 sm:py-8 md:py-16 space-y-6 sm:space-y-10 md:space-y-14 min-h-screen">
      {/*  Header Section */}
      <header className="flex md:flex-row justify-between md:items-center mb-10 gap-4 items-center">
        <Title>Dashboard</Title>
        <GenerateRecipeModal />
      </header>

      {/* Feature Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </section>

      {/*  Recent Activity Section */}
      <section className="flex flex-col gap-6">
        <Title size="sm">Recent Activity</Title>

        {recentDays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAll ? recentDays : recentDays.slice(0, 3)).map(
              ({ fullDate, formattedDate, meals }) => (
                <RecentActivityCard
                  key={fullDate}
                  displayDate={formattedDate}
                  fullDate={fullDate}
                  meals={meals}
                />
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500">No recent activity recorded.</p>
        )}

        {/* Show More / Show Less Button */}
        {recentDays.length > 3 && (
          <div className="flex justify-center mt-4 pb-4">
            <Button
              variant="outline"
              onClick={() => setShowAll((prev) => !prev)}
              className="text-sm"
              aria-label={
                showAll
                  ? "Show less recent activity"
                  : "Show more recent activity"
              }
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

/* 📌 Feature Cards */
const FEATURE_CARDS = [
  {
    title: "Recipe Library",
    description: "Discover new recipes to try out for your next meal.",
    icon: "📚",
    link: "/recipes",
    buttonText: "Explore",
  },
  {
    title: "Generate Recipes",
    description: "Get meal ideas based on your available ingredients.",
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
