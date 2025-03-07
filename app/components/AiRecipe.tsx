import ReactMarkdown from "react-markdown";
import Title from "@/app/components/Title";

type AiRecipeProps = {
  recipe: string;
};

export default function AiRecipe({ recipe }: AiRecipeProps) {
  return (
    <div className="mx-auto w-full min-w-full max-w-full h-full min-h-screen py-16 px-6 space-y-14">
      <Title className="text-2xl font-semibold text-foreground mb-4">
        Plateful Recommends:
      </Title>

      {recipe === "Generating AI recipe... 🍽️" ? (
        <p className="text-muted-foreground text-center">
          ⌛ AI is generating a recipe...
        </p>
      ) : (
        <ReactMarkdown>{recipe}</ReactMarkdown>
      )}
    </div>
  );
}
