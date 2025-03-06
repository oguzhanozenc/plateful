import { NextRequest, NextResponse } from "next/server";

const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL!;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const recipeId = url.pathname.split("/").pop();

    const parsedId = parseInt(recipeId!, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid Recipe ID" }, { status: 400 });
    }

    const apiUrl = `${SPOONACULAR_API_URL}/recipes/${parsedId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`;

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
      throw new Error(`API request failed: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ [Single Recipe] API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch single recipe" },
      { status: 500 }
    );
  }
}
