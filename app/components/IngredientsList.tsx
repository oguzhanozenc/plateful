"use client";

import { useState, useMemo } from "react";
import { useGenerateRecipe } from "@/context/GenerateRecipeContext";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/ui/command";
import { ScrollArea } from "@/ui/scroll-area";
import { Card } from "@/ui/card";
import { X, Sparkles } from "lucide-react";

export default function IngredientsList() {
  const {
    ingredients,
    addIngredient,
    removeIngredient,
    availableIngredients,
    fetchAiRecipe,
  } = useGenerateRecipe();

  const [newIngredient, setNewIngredient] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const safeInventory = useMemo(
    () => availableIngredients ?? [],
    [availableIngredients]
  );

  const handleAddIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      addIngredient(ingredient);
      setNewIngredient("");
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newIngredient.trim()) {
      e.preventDefault();
      const existingItem = safeInventory.find(
        (item) => item.toLowerCase() === newIngredient.toLowerCase()
      );
      handleAddIngredient(existingItem || newIngredient);
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg  flex flex-col">
      <Card className="flex flex-col justify-between gap-6 p-6 md:p-8 shadow-lg rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl w-full">
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Ingredients
          </h2>
          <p className="text-sm text-muted-foreground">
            Select from inventory or add manually.
          </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              {/* Wrap ONLY the input inside PopoverTrigger */}
              <Input
                type="text"
                placeholder="Search or type an ingredient..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border border-white/20 bg-white/20 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary rounded-lg transition w-full px-4 py-2"
              />
            </PopoverTrigger>

            {/* Styled Popover List */}
            <PopoverContent
              align="start"
              className="w-full max-w-md p-2 bg-white/30 backdrop-blur-lg shadow-xl rounded-xl border border-white/20"
            >
              <Command>
                <CommandInput
                  placeholder="Search inventory..."
                  className="px-3 py-2 text-sm rounded-lg bg-transparent border-b"
                />
                <CommandList>
                  <CommandEmpty className="text-muted-foreground text-center text-sm py-2">
                    No matching items found.
                  </CommandEmpty>
                  <CommandGroup>
                    {safeInventory.map((item) => (
                      <CommandItem
                        key={item}
                        onSelect={() => handleAddIngredient(item)}
                        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/30 rounded-lg transition"
                      >
                        <span className="text-sm">{item}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Add Button (Separate from Input) */}
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 rounded-lg shadow-md transition px-4 py-2 w-full sm:w-auto"
            onClick={() => handleAddIngredient(newIngredient)}
            disabled={!newIngredient.trim()}
          >
            Add
          </Button>
        </div>

        <div className="mt-4 w-full flex flex-col">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Your Ingredients
          </h3>
          <ScrollArea className="w-full max-h-40 rounded-md border border-white/30 p-2">
            <div className="flex flex-wrap gap-2 w-full">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient}
                  className="flex items-center justify-between bg-white/30 backdrop-blur-lg border border-white/40 shadow-sm px-3 py-2 rounded-lg w-full sm:w-auto"
                >
                  <span className="text-sm font-medium text-foreground">
                    {ingredient}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(ingredient)}
                    className="text-destructive hover:bg-destructive/10 rounded-full p-1 transition"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Generate Recipe Button */}
        <div className="flex justify-end w-full">
          <Button
            className={`w-full sm:w-auto flex justify-center items-center gap-2 py-3 rounded-lg font-medium tracking-wide transition-all ${
              ingredients.length < 3
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
            onClick={fetchAiRecipe}
            disabled={ingredients.length < 3}
          >
            Generate Recipe <Sparkles size={16} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
