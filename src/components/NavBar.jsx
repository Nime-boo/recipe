import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [shoppingListCount, setShoppingListCount] = useState(0);

  // Function to get shopping list count
  const updateShoppingListCount = () => {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setShoppingListCount(shoppingList.length);
  };

  useEffect(() => {
    updateShoppingListCount();
    // Listen for changes in localStorage
    window.addEventListener("storage", updateShoppingListCount);
    return () => window.removeEventListener("storage", updateShoppingListCount);
  }, []);

  return (
    <nav className={`p-4 shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-500 text-white"}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg font-semibold">
          <NavLink to="/" className="hover:underline" activeClassName="text-yellow-500">
            Home
          </NavLink>
          <NavLink to="/favorites" className="hover:underline" activeClassName="text-yellow-500">
            Favorites
          </NavLink>
          <NavLink to="/shopping-list" className="hover:underline" activeClassName="text-yellow-500">
            🛒 Shopping List ({shoppingListCount})
          </NavLink>
          {/* Add Profile link */}
          <NavLink to="/my-profile" className="hover:underline" activeClassName="text-yellow-500">
            👤 Profile
          </NavLink>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-md border ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

