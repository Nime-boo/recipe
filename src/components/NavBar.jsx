import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use context

  return (
    <nav className={`p-4 shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Recipe App
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/favorites" className="hover:underline">Favorites</Link>
          <button 
            onClick={toggleTheme} 
            className="px-4 py-2 rounded-md border"
          >
            {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
