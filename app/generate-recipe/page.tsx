"use client";

import Title from "@/app/components/Title";

export default function GenerateRecipe() {
  return (
    <div className="mx-auto w-full min-wfull max-w-full h-full min-h-screen py-16 px-6 space-y-14">
      <div>
        <Title>Generate Recipe</Title>

        <p className="text-gray-600 my-4">
          Enter ingredients, and let AI create a recipe for you.
        </p>

        <Title className="text-2xl font-semibold my-2 text-gray-800">
          Generate Recipe feature is under construction. Please check back
          later. Thanks for your understanding.
        </Title>
      </div>
    </div>
  );
}
