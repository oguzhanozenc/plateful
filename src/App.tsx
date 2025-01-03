// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FoodInventory from "./pages/FoodInventory";
import GenerateRecipe from "./pages/GenerateRecipe";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";
import CreateRecipe from "./pages/CreateRecipe";

import { AppProvider } from "./store/AppContext";

export default function App() {
  return (
    <AppProvider>
      <main>
        <Router>
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<FoodInventory />} />
            <Route path="/generate-recipe" element={<GenerateRecipe />} />
            <Route path="/weekly-planner" element={<WeeklyPlanner />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
          </Routes>
        </Router>
      </main>
    </AppProvider>
  );
}
