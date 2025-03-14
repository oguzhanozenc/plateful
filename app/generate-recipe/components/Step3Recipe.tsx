"use client";

import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import AiRecipe from "@/app/components/AiRecipe";
import { Button } from "@/ui/button";
import SaveToPlannerModal from "@/app/components/SaveToPlannerModal";
import Title from "@/app/components/Title";
import { Sparkles } from "lucide-react";
export default function Step3Recipe() {
  const { recipe, resetPage } = useGenerateRecipe();

  return (
    <div className="flex flex-col items-center p-6 sm:p-8 space-y-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 animate-fade-in transition-all duration-300 w-full  mx-auto">
      {/* ✅ Improved Title */}
      <div className="flex items-center justify-center space-x-2 text-center">
        <Sparkles className="text-primary w-6 h-6 sm:w-7 sm:h-7 animate-fade-in" />
        <Title className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight text-center">
          Your AI-Generated Recipe
        </Title>
      </div>
      {/* ✅ Subtle Divider */}
      <div className="border-t border-white/20 w-full" />

      {/* ✅ AI Recipe Section */}
      <div
        aria-live="polite"
        className="text-sm sm:text-base w-full  text-foreground leading-relaxed"
      >
        <AiRecipe />
      </div>

      {/* ✅ Button Actions */}
      <div className="flex justify-center gap-3 sm:gap-5 w-full">
        {/* 🔄 Start Over Button (Better Contrast) */}
        <Button
          variant="outline"
          className="bg-white/20 border-white/30 text-foreground hover:bg-white/30 transition-all w-full sm:w-auto"
          onClick={resetPage}
        >
          Start Over ↺
        </Button>

        {recipe && <SaveToPlannerModal />}
      </div>
    </div>
  );
}
