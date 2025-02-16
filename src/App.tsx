import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import FoodInventory from "./pages/FoodInventory";
import GenerateRecipe from "./pages/GenerateRecipe";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";
import CreateRecipe from "./pages/CreateRecipe";

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<FoodInventory />} />
          <Route path="/generate-recipe" element={<GenerateRecipe />} />
          <Route path="/weekly-planner" element={<WeeklyPlanner />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}
