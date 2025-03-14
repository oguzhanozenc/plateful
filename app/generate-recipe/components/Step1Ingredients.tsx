"use client";

import IngredientsList from "@/app/components/IngredientsList";

import Title from "@/app/components/Title";

export default function Step1Ingredients() {
  return (
    <div className="mx-auto w-full max-w-screen-lg px-1 py-2 sm:px-6 py-6 sm:py-8 md:py-16 space-y-6 sm:space-y-10 md:space-y-14 ">
      <Title className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
        What's in Your Kitchen?
      </Title>

      <div className="flex justify-between w-full">
        <IngredientsList />
      </div>
    </div>
  );
}
