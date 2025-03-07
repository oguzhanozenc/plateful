export async function getAiRecipe(ingredientsArr: string[]): Promise<string> {
  try {
    const response = await fetch("/api/get-ai-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch AI recipe: ${response.statusText}`);
    }

    const data = await response.json();
    return (
      data.recipe ||
      "⚠️ No AI-generated recipe found. Try different ingredients."
    );
  } catch (err) {
    console.error("Error fetching AI recipe:", err);
    return "⚠️ Error fetching AI recipe. Please try again.";
  }
}
