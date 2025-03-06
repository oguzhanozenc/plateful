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

    let apiUrl = `${SPOONACULAR_API_URL}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=${number}&sort=popularity&addRecipeInformation=true`;

    if (query) apiUrl += `&query=${query}`;
    if (cuisine) apiUrl += `&cuisine=${cuisine}`;
    if (diet) apiUrl += `&diet=${diet}`;
    if (intolerances) apiUrl += `&intolerances=${intolerances}`;
    if (maxReadyTime) apiUrl += `&maxReadyTime=${maxReadyTime}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.results) {
      throw new Error("Invalid API response: Missing `results` field.");
    }

    return NextResponse.json({
      results: data.results,
      totalResults: data.totalResults ?? 0,
    });
  } catch (error) {
    console.error("❌ [Recipes] API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
