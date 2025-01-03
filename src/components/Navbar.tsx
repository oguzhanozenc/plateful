// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaBox,
  FaCalendar,
  FaPlus,
  FaUserCog,
} from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";

export default function Navbar() {
  return (
    <aside className="bg-gray-900 text-white fixed top-0 left-0 h-full w-64 shadow-md">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Plateful</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-700 hover:text-white`
              }
            >
              <FaHome className="mr-3" />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-700 hover:text-white`
              }
            >
              <FaBox className="mr-3" />
              Food Inventory
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/generate-recipe"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-700 hover:text-white`
              }
            >
              <RiAiGenerate className="mr-3" />
              Generate Recipe
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/weekly-planner"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-700 hover:text-white`
              }
            >
              <FaCalendar className="mr-3" />
              Weekly Planner
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-700 hover:text-white`
              }
            >
              <FaClipboardList className="mr-3" />
              Recipes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/shopping-list"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-700 hover:text-white`
              }
            >
              <FaBox className="mr-3" />
              Shopping List
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/create-recipe"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400"
                } hover:bg-gray-700 hover:text-white`
              }
            >
              <FaPlus className="mr-3" />
              Create Recipe
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 mt-auto">
        <NavLink
          to="/settings"
          className="flex items-center px-4 py-3 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <FaUserCog className="mr-3" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
