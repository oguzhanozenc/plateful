import { NextRequest, NextResponse } from "next/server";

const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL!;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const recipeId = id.trim();

    if (!recipeId || isNaN(Number(recipeId))) {
      return NextResponse.json({ error: "Invalid Recipe ID" }, { status: 400 });
    }

    const apiUrl = `${SPOONACULAR_API_URL}/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(
          { error: "Recipe not found" },
          { status: 404 }
        );
      }
      if (res.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ [Single Recipe] API Error:", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to fetch recipe. Please try again later." },
      { status: 500 }
    );
  }
}
