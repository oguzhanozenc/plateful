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
    <Card className="flex border border rounded-xl border-neutral-200 bg-white/80 backdrop-blur-xl shadow-md hover:shadow-lg transition-shadow duration-500 ease-out py-6 px-4 flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <div className="text-4xl">{icon}</div>
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-neutral-900 text-lg font-semibold leading-[1.3]">
              {title}
            </CardTitle>
            <p className="text-neutral-500 text-[13px] leading-snug mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-auto">
        <Link href={link} passHref>
          <Button variant="secondary" className="border border-neutral">
            {buttonText}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
