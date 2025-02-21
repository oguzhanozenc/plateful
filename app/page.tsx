import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardTitle } from "@/ui/card";
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
    <div className="mx-auto max-w-5xl py-16 px-6 space-y-14">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Dashboard
        </h1>
        <Link href="/new-plan" passHref>
          <Button className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-black hover:bg-neutral-950 transform scale-102 translate-y-[-1px] transition-all duration-300 ease-in-out text-white rounded-lg shadow-lg transition-all">
            <PlusIcon size={16} />
            New Plan
          </Button>
        </Link>
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

function RecentActivityCard({ day }: RecentActivityCardProps) {
  return (
    <Card className="border border-neutral-300 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg p-6 flex flex-col">
      <CardTitle className="text-sm font-semibold text-neutral-800">
        {day}
      </CardTitle>
      <p className="text-neutral-700 text-sm mt-2 flex-1">
        No meals planned yet.
      </p>
      <div className="mt-3 flex justify-end">
        <Link href="/planner" passHref>
          <Button className="px-5 py-2.5 text-sm font-medium bg-neutral-200 hover:bg-neutral-300 border border-neutral-500 text-neutral-800 text-neutral-900 border border-neutral-300 rounded-lg transition-all">
            View
          </Button>
        </Link>
      </div>
    </Card>
  );
}
