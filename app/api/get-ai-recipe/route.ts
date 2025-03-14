import { HfInference } from "@huggingface/inference";
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import "server-only";

const hfAccessToken = process.env.HF_ACCESS_TOKEN;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!hfAccessToken || !anthropicApiKey) {
  console.error(
    "❌ Missing required API keys! Ensure HF_ACCESS_TOKEN and ANTHROPIC_API_KEY are set."
  );
}

const hf = new HfInference(hfAccessToken);
const anthropic = new Anthropic({ apiKey: anthropicApiKey });

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

export async function POST(req: Request) {
  try {
    const { ingredients, model = "claude" } = await req.json();

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        {
          error:
            "Invalid request. Please provide a list of ingredients as an array.",
        },
        { status: 400 }
      );
    }

    const ingredientsString = ingredients.join(", ");
    let recipe = "";

    if (model === "claude") {
      const claudeResponse = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `I have ${ingredientsString}. Please give me a recipe!`,
          },
        ],
      });

      console.log("Claude Response:", JSON.stringify(claudeResponse, null, 2));

      if (Array.isArray(claudeResponse?.content)) {
        recipe = claudeResponse.content
          .map((block) => {
            if (typeof block === "string") return block;
            if (
              block &&
              typeof block === "object" &&
              "text" in block &&
              typeof block.text === "string"
            ) {
              return block.text;
            }
            return "";
          })
          .join("\n")
          .trim();
      } else {
        recipe = "⚠️ No valid response from Claude.";
      }
    } else {
      const mistralResponse = await hf.chatCompletion({
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

      console.log(
        "Mistral Response:",
        JSON.stringify(mistralResponse, null, 2)
      );

      recipe =
        mistralResponse?.choices?.[0]?.message?.content?.trim() ||
        "⚠️ No valid response from Mistral.";
    }

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("❌ Error fetching AI-generated recipe:", error);
    return NextResponse.json(
      {
        error: `Failed to generate a recipe. Details: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
