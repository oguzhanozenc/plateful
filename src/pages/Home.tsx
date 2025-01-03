import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Plateful</h1>
        <p className="text-gray-300 text-lg mb-8">
          Plan your meals, manage your ingredients, and discover new recipes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/inventory"
            className="flex flex-col items-center px-6 py-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Manage Inventory
          </Link>
          <Link
            to="/generate-recipe"
            className="flex flex-col items-center px-6 py-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            Generate Recipes
          </Link>
          <Link
            to="/weekly-planner"
            className="flex flex-col items-center px-6 py-4 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
          >
            Weekly Planner
          </Link>
        </div>
      </div>
    </div>
  );
}
