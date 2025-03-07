import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";
import "server-only"; // ✅ Enforce server execution for security

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = `
You are an AI assistant that suggests a recipe based on a given list of ingredients. You don't need to use every ingredient. Additional ingredients are allowed, but keep them minimal. Format your response in markdown.
`;

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    // ✅ Validate input before making the request
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Please provide a list of ingredients." },
        { status: 400 }
      );
    }

    const ingredientsString = ingredients.join(", ");
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe!`,
        },
      ],
      max_tokens: 1024,
    });

    // ✅ Ensure a valid response
    const recipeContent = response?.choices?.[0]?.message?.content;
    if (!recipeContent) {
      throw new Error("No recipe returned from AI model.");
    }

    return NextResponse.json({ recipe: recipeContent });
  } catch (error) {
    console.error("Error fetching AI-generated recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate a recipe. Please try again later." },
      { status: 500 }
    );
  }
}
