"use client";

import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import { Dialog, DialogTrigger, DialogContent } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Sparkles } from "lucide-react";
import Step1Ingredients from "@/app/generate-recipe/components/Step1Ingredients";
import Step2Loading from "@/app/generate-recipe/components/Step2Loading";
import Step3Recipe from "@/app/generate-recipe/components/Step3Recipe";

export default function GenerateRecipeModal() {
  const { step } = useGenerateRecipe();

  return (
    <div className="max-w-md sm:max-w-lg aspect-w-16 aspect-h-9">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium bg-black hover:bg-neutral-950 text-white rounded-md shadow-md">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Generate Recipe</span>
            <span className="inline sm:hidden">Generate</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-6 rounded-lg">
          <div className="space-y-6">
            {step === 1 && <Step1Ingredients />}
            {step === 2 && <Step2Loading />}
            {step === 3 && <Step3Recipe />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
