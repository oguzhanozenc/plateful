"use client";

import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import { Loader2 } from "lucide-react";

export default function Step2Loading() {
  const { progressText } = useGenerateRecipe();

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 space-y-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl animate-fade-in transition-all duration-300 w-full max-w-lg mx-auto mt-10 sm:mt-16">
      {/* Animated Loader with Glow */}
      <div className="relative">
        <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-spin" />
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/50 opacity-40"></div>
        <div className="absolute inset-0 animate-pulse rounded-full border border-primary/30 opacity-20"></div>
      </div>

      {/* Progress Message with Enhanced Readability */}
      <p className="text-center text-sm sm:text-lg font-medium text-foreground tracking-wide leading-relaxed max-w-md">
        {progressText}
      </p>
    </div>
  );
}
