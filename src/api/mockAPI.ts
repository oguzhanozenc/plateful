// src/api/mockAPI.ts

import { Recipe } from "../types/types";

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Avocado Toast",
    ingredients: ["Avocado", "Bread", "Salt"],
    category: "Other",
    image: "https://via.placeholder.com/200x150?text=Avocado+Toast",
    calories: 300,
    description: "A quick and healthy breakfast.",
    tags: ["Vegetarian"],
  },
  {
    id: 2,
    title: "Chicken Salad",
    ingredients: ["Chicken", "Lettuce", "Tomato"],
    category: "Protein",
    image: "https://via.placeholder.com/200x150?text=Chicken+Salad",
    calories: 400,
    description: "Great protein-packed meal.",
    tags: ["Low-Carb"],
  },
  {
    id: 3,
    title: "Pasta Marinara",
    ingredients: ["Pasta", "Tomato Sauce", "Garlic"],
    category: "Grain",
    image: "https://via.placeholder.com/200x150?text=Pasta+Marinara",
    calories: 600,
    description: "Classic Italian dish.",
    tags: [],
  },
  {
    id: 4,
    title: "Spaghetti Bolognese",
    ingredients: ["spaghetti", "tomatoes", "beef"],
    image: "https://via.placeholder.com/300x200",
    calories: 600,
    description: "Classic Italian pasta dish.",
    tags: ["Protein", "Pasta"],
  },
  {
    id: 5,
    title: "Greek Salad",
    ingredients: ["tomatoes", "cucumber", "feta"],
    image: "https://via.placeholder.com/300x200",
    calories: 250,
    description: "Light and refreshing salad.",
    tags: ["Vegetable", "LowCalorie"],
  },
];
