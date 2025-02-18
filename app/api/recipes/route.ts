import { NextResponse } from "next/server";

const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL!;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

export async function GET(req: Request) {
  try {
    console.log("📡 API Request Received:", req.url);

    const { searchParams } = new URL(req.url);
    const ingredients = searchParams.get("ingredients") || "";
    const number = searchParams.get("number") || "10";
    const diet = searchParams.get("diet") || "";

    if (!ingredients) {
      console.error("❌ Missing ingredients parameter");
      return NextResponse.json(
        { error: "Missing ingredients" },
        { status: 400 }
      );
    }

    // ✅ Construct API URL
    const apiUrl = `${SPOONACULAR_API_URL}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&includeIngredients=${ingredients}&number=${number}&diet=${
      diet !== "Any" ? diet : ""
    }&addRecipeInformation=true`;

    console.log("🔍 Fetching from Spoonacular:", apiUrl);

    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error(`❌ API Request Failed: ${res.status} ${res.statusText}`);
      return NextResponse.json(
        { error: `API Error: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("✅ API Response:", data);

    return NextResponse.json(data.results || []);
  } catch (error) {
    console.error("❌ Route API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
