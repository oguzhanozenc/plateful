"use client";

import { Card } from "@/ui/card";

export function RecipeDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-pulse">
      <Card className="border rounded-md shadow-sm p-6 md:flex md:flex-row md:gap-8 bg-white">
        {/* Image Placeholder */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <div className="w-full h-64 bg-gray-300 rounded-md"></div>
        </div>

        {/* Content Placeholder */}
        <div className="md:w-1/2">
          <div className="h-6 bg-gray-300 w-3/4 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 w-1/2 rounded mb-4"></div>

          {/* Ingredients */}
          <div className="h-4 bg-gray-300 w-full rounded mb-2"></div>
          <div className="h-4 bg-gray-300 w-2/3 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>

          {/* Instructions */}
          <div className="h-4 bg-gray-300 w-full rounded mb-2"></div>
          <div className="h-4 bg-gray-300 w-2/3 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>

          {/* Button */}
          <div className="w-full h-10 bg-gray-300 rounded mt-6"></div>
        </div>
      </Card>
    </div>
  );
}
