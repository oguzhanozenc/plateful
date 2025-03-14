"use client";

import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function AiRecipe() {
  const { recipe } = useGenerateRecipe();

  const isGenerating = !recipe || recipe.startsWith("Generating");

  return (
    <div className="py-8 px-6 space-y-6">
      {isGenerating ? (
        <p className="text-muted-foreground text-center text-lg">
          ⏳ Hang tight! AI is creating your recipe...
        </p>
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {recipe || "⚠️ No recipe generated. Try different ingredients."}
        </ReactMarkdown>
      )}
    </div>
  );
}
