import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useContext(ThemeContext); // Get theme context

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.meals) {
            setSuggestions(data.meals.map((meal) => meal.strMeal));
          } else {
            setSuggestions([]);
          }
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      setShowSuggestions(false); // Hide suggestions after search
    }
  };

  return (
    <div className="mb-4 relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          className={`p-2 border rounded-md w-full transition-all duration-300 
            ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" 
                               : "bg-white text-black border-gray-300"}`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-md transition-all duration-300 
            ${theme === "dark" ? "bg-gray-700 text-white hover:bg-gray-600" 
                               : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Search
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className={`absolute border rounded-md w-full mt-1 z-50 max-h-40 overflow-auto transition-all duration-300 
          ${theme === "dark" ? "bg-gray-900 text-white border-gray-600" 
                             : "bg-white text-black border-gray-300"}`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer transition-all duration-200 
                ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              onClick={() => {
                setQuery(suggestion);
                setShowSuggestions(false); // Hide after selection
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

