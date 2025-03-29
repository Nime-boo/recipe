import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  let debounceTimer;

  useEffect(() => {
    return () => clearTimeout(debounceTimer);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (e.target.value.trim() !== "") {
        onSearch(e.target.value);
        setShowSuggestions(false); // Hide suggestions after search
      }
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      setShowSuggestions(false); // Hide suggestions after search
      setSuggestions((prev) => 
        [query, ...prev.filter((item) => item !== query)].slice(0, 5)
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          className="p-2 border rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border rounded-md mt-1 shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
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

