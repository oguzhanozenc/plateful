export async function getAiRecipe(ingredientsArr: string[]): Promise<string> {
  try {
    const response = await fetch("/api/get-ai-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          `Failed to fetch AI recipe: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return (
      data.recipe ||
      "⚠️ No AI-generated recipe found. Try different ingredients."
    );
  } catch (error) {
    console.error("❌ Error fetching AI recipe:", error);
    return `⚠️ Error fetching AI recipe. Details: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}
