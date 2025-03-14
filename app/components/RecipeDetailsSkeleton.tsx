"use client";

import { Skeleton } from "@/ui/skeleton";
import { Separator } from "@/ui/separator";

export function RecipeDetailsSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 animate-pulse">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center sticky top-0 bg-background p-4 rounded-lg z-10">
        <Skeleton className="h-10 w-24 bg-secondary" />
        <Skeleton className="h-10 w-32 bg-secondary" />
      </div>

      {/* Image Skeleton */}
      <Skeleton className="h-64 w-full rounded-lg bg-secondary mt-6" />

      <div className="mt-6 space-y-4">
        <Skeleton className="h-10 w-3/5 bg-secondary" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-16 bg-secondary" />
          <Skeleton className="h-6 w-20 bg-secondary" />
          <Skeleton className="h-6 w-24 bg-secondary" />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Ingredients */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32 bg-secondary" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Skeleton className="h-5 w-24 bg-secondary" />
          <Skeleton className="h-5 w-20 bg-secondary" />
          <Skeleton className="h-5 w-32 bg-secondary" />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Instructions */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32 bg-secondary" />
        <Skeleton className="h-5 w-full bg-secondary mb-2" />
        <Skeleton className="h-5 w-2/3 bg-secondary mb-2" />
        <Skeleton className="h-5 w-1/2 bg-secondary mb-2" />
      </div>
    </div>
  );
}
