import { NextRequest, NextResponse } from "next/server";

const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL!;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim() || "";
    const number = searchParams.get("number") || "10";
    const cuisine = searchParams.get("cuisine") || "";
    const diet = searchParams.get("diet") || "";
    const intolerances = searchParams.get("intolerances") || "";
    const maxReadyTime = searchParams.get("maxReadyTime") || "";

    // ✅ Construct API URL safely
    const apiParams = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      number,
      sort: "popularity",
      addRecipeInformation: "true",
      ...(query && { query }),
      ...(cuisine && { cuisine }),
      ...(diet && { diet }),
      ...(intolerances && { intolerances }),
      ...(maxReadyTime && { maxReadyTime }),
    });

    const apiUrl = `${SPOONACULAR_API_URL}/recipes/complexSearch?${apiParams.toString()}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });

    if (!res.ok) {
      if (res.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      return NextResponse.json({ results: [], totalResults: 0 });
    }

    return NextResponse.json({
      results: data.results,
      totalResults: data.totalResults ?? 0,
    });
  } catch (error) {
    console.error("❌ [Recipes] API Error:", (error as Error).message);

    return NextResponse.json(
      { error: (error as Error).message || "Failed to fetch recipes." },
      { status: 500 }
    );
  }
}
