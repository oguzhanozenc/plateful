"use client";

import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import { useFetchedRecipe } from "@/context/FetchedRecipeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Recipe } from "@/types/types";

export default function RecipePreview() {
  const { recipe: fetchedRecipe } = useFetchedRecipe();
  const { recipe: aiRecipe } = useGenerateRecipe();

  const recipeToShow = fetchedRecipe ? JSON.stringify(fetchedRecipe) : aiRecipe;

  let parsedRecipe: Recipe | null = null;
  let isMarkdown = false;
  let isPlainText = false;

  try {
    parsedRecipe = JSON.parse(recipeToShow);
    isMarkdown = false;
  } catch {
    const markdownPattern = /[#*_\-~`]/;
    if (markdownPattern.test(recipeToShow.trim())) {
      isMarkdown = true;
    } else {
      isPlainText = true;
    }
  }

  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-gray-100 rounded-md">
        <span className="font-medium text-gray-900">Recipe Preview</span>
        <ChevronDown className="w-4 h-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 p-4 bg-gray-50 rounded-md text-sm max-h-[40vh] overflow-y-auto">
        {isMarkdown ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {recipeToShow}
          </ReactMarkdown>
        ) : parsedRecipe ? (
          <div>
            <p className="font-medium text-gray-900">Ingredients:</p>
            {parsedRecipe.extendedIngredients?.length ? (
              <ul className="list-disc list-inside text-gray-700">
                {parsedRecipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No ingredients available.</p>
            )}

            <p className="font-medium text-gray-900 mt-3">Instructions:</p>
            {parsedRecipe.analyzedInstructions?.[0]?.steps?.length ? (
              <ol className="list-decimal list-inside text-gray-700 space-y-3">
                {parsedRecipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500">No instructions available.</p>
            )}
          </div>
        ) : isPlainText ? (
          <p className="text-gray-700 whitespace-pre-line">{recipeToShow}</p>
        ) : (
          <p className="text-gray-500 italic">No recipe details available.</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
