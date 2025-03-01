"use client";

import { Card } from "@/ui/card";

export function RecipeCardSkeleton() {
  return (
    <Card className="border rounded-md shadow-sm p-4 bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="rounded-md w-full h-40 bg-gray-300 mb-3"></div>

      {/* Title Placeholder */}
      <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>

      {/* Meta Information Placeholder */}
      <div className="h-3 bg-gray-300 w-1/2 rounded mb-3"></div>
      <div className="h-3 bg-gray-300 w-1/3 rounded mb-3"></div>

      {/* Button Placeholder */}
      <div className="w-full h-10 bg-gray-300 rounded"></div>
    </Card>
  );
}
