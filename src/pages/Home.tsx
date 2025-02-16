import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  link: string;
  buttonText: string;
};

type RecentActivityCardProps = {
  day: string;
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl py-12 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-[#3c692c] tracking-tight">
          Dashboard
        </h1>
        <Button className="flex items-center gap-2 px-5 py-2.5 text-md bg-[#3c692c] hover:bg-[#519339] text-white rounded-full shadow-md transition-all duration-300 font-inherit">
          <PlusIcon size={20} />
          New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <FeatureCard
          title="Manage Inventory"
          description="Track and organize ingredients effortlessly."
          icon="📦"
          link={ROUTES.INVENTORY}
          buttonText="Manage"
        />
        <FeatureCard
          title="Generate Recipes"
          description="Get meal ideas based on your available items."
          icon="🥗"
          link={ROUTES.GENERATE_RECIPE}
          buttonText="Generate"
        />
        <FeatureCard
          title="Weekly Planner"
          description="Plan meals efficiently for the upcoming week."
          icon="📅"
          link={ROUTES.WEEKLY_PLANNER}
          buttonText="Plan"
        />
      </div>

      <h2 className="text-2xl font-bold text-[#3c692c] mb-8">
        Recent Activity
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Monday", "Tuesday", "Wednesday"].map((day) => (
          <RecentActivityCard key={day} day={day} />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  link,
  buttonText,
}: FeatureCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md rounded-xl p-6 flex flex-col gap-4 max-w-[320px] mx-auto">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <CardTitle className="text-[#519339] text-lg font-semibold leading-tight mb-2">
            {title}
          </CardTitle>
          <p className="text-gray-500 text-sm leading-snug">{description}</p>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <Link to={link}>
          <Button className="px-4 py-2 bg-[#3D2F2A] hover:bg-[#271D1A] text-white text-sm font-medium rounded-md shadow-none transition-all duration-300 font-inherit">
            {buttonText}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function RecentActivityCard({ day }: RecentActivityCardProps) {
  return (
    <Card className="bg-[#F9FAF9] text-gray-900 border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md rounded-xl p-5 flex flex-col">
      <CardTitle
        className={`text-md font-semibold ${
          day === "Monday" ? "text-[#3c692c]" : "text-gray-700"
        }`}
      >
        {day}
      </CardTitle>
      <p className="text-gray-600 text-sm mt-3 flex-1 leading-snug">
        No meals planned yet.
      </p>
      <div className="mt-3 flex justify-end">
        <Link to={ROUTES.WEEKLY_PLANNER}>
          <Button className="px-4 py-2 bg-[#7A6A60] hover:bg-[#67574D] text-white text-sm font-medium rounded-md shadow-none transition-all duration-300 font-inherit">
            View
          </Button>
        </Link>
      </div>
    </Card>
  );
}
