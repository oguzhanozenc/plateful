import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { X } from "lucide-react";

type IngredientsListProps = {
  ingredients: string[];
  getRecipe: () => void;
  removeIngredient: (ingredient: string) => void;
};

export default function IngredientsList({
  ingredients,
  getRecipe,
  removeIngredient,
}: IngredientsListProps) {
  return (
    <Card className="mt-6 p-6 border border-muted shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Ingredients on hand:
      </h2>

      {ingredients.length > 0 ? (
        <ul className="border border-muted/40 rounded-lg divide-y divide-muted">
          {ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="py-2 px-3 flex justify-between items-center"
            >
              <span className="text-foreground">{ingredient}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(ingredient)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No ingredients added yet.</p>
      )}

      <Button
        onClick={getRecipe}
        disabled={ingredients.length < 3}
        className={`w-full ${
          ingredients.length < 3
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary hover:bg-primary/80"
        }`}
      >
        {ingredients.length < 3 ? "Add at least 3 ingredients" : "Get a Recipe"}
      </Button>
    </Card>
  );
}
