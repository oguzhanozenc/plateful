"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Recipe } from "@/types/types";
import { Badge } from "@/ui/badge";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  if (!recipe?.id) return null;

  return (
    <Card
      className="flex flex-col border rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white/80 backdrop-blur-xl gap-2 cursor-pointer"
      onClick={() => router.push(`/recipes/${recipe.id}`)}
    >
      <Image
        src={recipe.image || "/placeholder-recipe.jpg"}
        alt={recipe.title || "Recipe Image"}
        width={300}
        height={200}
        className="rounded-t-md w-full h-40 object-cover object-center grayscale-[25%] transition-all duration-300 
             hover:grayscale-0 [mask-image:linear-gradient(to_top,rgba(0,0,0,0)_2%,black_35%)]"
        priority
      />

      <div className="flex flex-col px-3 justify-between">
        <h3 className="text-base font-medium text-gray-900 my-1">
          {recipe.title}
        </h3>
        <div className="flex flex-row flex-wrap gap-2">
          <p className="text-xs text-gray-500">
            ⏳ {recipe.readyInMinutes ?? "N/A"} min
          </p>
          <p className="text-xs text-gray-500">
            🍽 {recipe.servings ?? "N/A"} servings
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-white  px-3">
        {recipe.cuisines?.map((cuisine) => (
          <Badge
            variant="outline"
            key={cuisine}
            className=" px-2 py-1 rounded px-3 text-gray-800 text-xs font-medium"
          >
            🌎 {cuisine}
          </Badge>
        ))}
        {recipe.diets?.map((diet) => (
          <Badge
            variant="outline"
            key={diet}
            className=" px-2 py-1 rounded px-3 text-gray-800 text-xs font-medium"
          >
            🥗 {diet}
          </Badge>
        ))}
      </div>

      <div className="flex items-end mt-auto justify-end px-3 mb-3">
        <Button
          variant="secondary"
          className="border border-neutral"
          onClick={() => router.push(`/recipes/${recipe.id}`)}
        >
          View
        </Button>
      </div>
    </Card>
  );
}
