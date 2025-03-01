import { NextRequest, NextResponse } from "next/server";

const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL!;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const recipeId = url.pathname.split("/").pop();

    if (!recipeId) {
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }

    console.log("📡 Fetching single recipe by ID:", recipeId);

    const apiUrl = `${SPOONACULAR_API_URL}/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Single Recipe API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch single recipe" },
      { status: 500 }
    );
  }
}
