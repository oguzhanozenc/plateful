import { NextResponse } from "next/server";

const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL!;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim() || "";
    const number = searchParams.get("number") || "10";
    const cuisine = searchParams.get("cuisine") || "";
    const diet = searchParams.get("diet") || "";
    const intolerances = searchParams.get("intolerances") || "";
    const maxReadyTime = searchParams.get("maxReadyTime") || "";

    let apiUrl = `${SPOONACULAR_API_URL}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=${number}&addRecipeInformation=true&addRecipeNutrition=true&sort=popularity`;

    if (query) apiUrl += `&query=${query}`;
    if (cuisine) apiUrl += `&cuisine=${cuisine}`;
    if (diet) apiUrl += `&diet=${diet}`;
    if (intolerances) apiUrl += `&intolerances=${intolerances}`;
    if (maxReadyTime) apiUrl += `&maxReadyTime=${maxReadyTime}`;

    console.log("📡 Fetching:", apiUrl);
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    const recipes = data.recipes || data.results || [];
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
