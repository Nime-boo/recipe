import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`p-4 shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-500 text-white"}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg font-semibold">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/favorites" className="hover:underline">Favorites</Link>
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
