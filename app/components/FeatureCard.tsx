"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardTitle } from "@/ui/card";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  link: string;
  buttonText: string;
};

export default function FeatureCard({
  title,
  description,
  icon,
  link,
  buttonText,
}: FeatureCardProps) {
  return (
    <Card className="border border-neutral-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-500 ease-out rounded-lg p-6 flex flex-col gap-4">
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
