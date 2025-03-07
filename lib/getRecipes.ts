import type { Recipe } from "@/types/types";

export async function getRecipes(
  params: Record<string, string>
): Promise<Recipe[]> {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const apiUrl = `/api/recipes?${queryParams}`;

    console.log("🔍 Fetching recipes from:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    const data = await response.json();

    return Array.isArray(data.results) ? data.results : [];
  } catch (err) {
    console.error("❌ Error fetching recipes:", err);
    return [];
  }
}

export async function getRecipeById(recipeId: string): Promise<Recipe | null> {
  try {
    const apiUrl = `/api/recipes/${recipeId}`;
    console.log("🔍 Fetching recipe details from:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }

    const data = await response.json();

    return data && typeof data === "object" ? (data as Recipe) : null;
  } catch (err) {
    console.error("❌ Error fetching recipe details:", err);
    return null;
  }
}
