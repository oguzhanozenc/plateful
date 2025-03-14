"use client";

import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import Step1Ingredients from "@/app/generate-recipe/components/Step1Ingredients";
import Step2Loading from "@/app/generate-recipe/components/Step2Loading";
import Step3Recipe from "@/app/generate-recipe/components/Step3Recipe";

export default function GenerateRecipePage() {
  const { step } = useGenerateRecipe();

  return (
    <div className="flex flex-col mx-auto w-full max-w-screen-lg">
      {step === 1 && <Step1Ingredients />}
      {step === 2 && <Step2Loading />}
      {step === 3 && <Step3Recipe />}{" "}
    </div>
  );
}
