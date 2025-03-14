"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { getAiRecipe } from "@/lib/getAiRecipe";
import { useInventoryContext } from "@/context/InventoryContext";

type GenerateRecipeContextType = {
  ingredients: string[];
  availableIngredients: string[];
  recipe: string;
  step: number;
  progressText: string;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  fetchAiRecipe: () => void;
  resetPage: () => void;
};

const GenerateRecipeContext = createContext<
  GenerateRecipeContextType | undefined
>(undefined);

export function GenerateRecipeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { inventory } = useInventoryContext();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [progressText, setProgressText] = useState("Gathering ingredients...");
  const recipeSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  //  Memoize inventory items to avoid unnecessary recomputations
  const availableIngredients = useMemo(
    () => inventory.map((item) => item.name),
    [inventory]
  );

  function addIngredient(ingredient: string) {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
      setIngredients((prev) => [...prev, ingredient.trim()]);
    }
  }

  function removeIngredient(ingredientToRemove: string) {
    setIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  async function fetchAiRecipe() {
    if (ingredients.length < 3) return;

    setStep(2);
    setRecipe("");
    setProgressText("Gathering ingredients...");

    console.log("📡 Sending request to AI API with ingredients:", ingredients);

    try {
      // Mock progress steps for a better UX
      const progressSteps = [
        { text: "Gathering ingredients...", delay: 1000 },
        { text: "Analyzing ingredient combinations...", delay: 1500 },
        { text: "Checking nutritional balance...", delay: 1200 },
        { text: "Generating a unique recipe...", delay: 1800 },
        { text: "Finalizing details...", delay: 1500 },
      ];

      for (const step of progressSteps) {
        setProgressText(step.text);
        await new Promise((resolve) => setTimeout(resolve, step.delay));
      }

      //  Fetch AI recipe after mock progress steps
      const recipeMarkdown = await getAiRecipe(ingredients);

      //  Delay transition to Step 3 for a smoother UX
      setTimeout(() => {
        setRecipe(recipeMarkdown);
        setStep(3);
        setProgressText("Recipe is ready! 🎉");
      }, 1000);
    } catch (error) {
      console.error("❌ Error fetching AI recipe:", error);
      setRecipe("⚠️ Failed to generate a recipe. Please try again.");
      setStep(1);
      setProgressText("An error occurred. Try again.");
    }
  }

  function resetPage() {
    setStep(1);
    setIngredients([]);
    setRecipe("");
    setProgressText("Gathering ingredients...");
  }

  return (
    <GenerateRecipeContext.Provider
      value={{
        ingredients,
        availableIngredients,
        recipe,
        step,
        progressText,
        addIngredient,
        removeIngredient,
        fetchAiRecipe,
        resetPage,
      }}
    >
      {children}
    </GenerateRecipeContext.Provider>
  );
}

export function useGenerateRecipe() {
  const context = useContext(GenerateRecipeContext);
  if (!context) {
    throw new Error(
      "useGenerateRecipe must be used within GenerateRecipeProvider"
    );
  }
  return context;
}
