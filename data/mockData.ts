export function getMockRecipes() {
  return [
    {
      id: "1",
      title: "Spaghetti Carbonara",
      image: "",
      readyInMinutes: 25,
      servings: 2,
      healthScore: 75,
      aggregateLikes: 150,
      cuisines: ["Italian"],
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutrition: {
        nutrients: [{ name: "Calories", amount: 600 }],
      },
    },
    {
      id: "2",
      title: "Vegan Buddha Bowl",
      image: "",
      readyInMinutes: 30,
      servings: 1,
      healthScore: 85,
      aggregateLikes: 250,
      cuisines: ["Asian"],
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      nutrition: {
        nutrients: [{ name: "Calories", amount: 450 }],
      },
    },
  ];
}
