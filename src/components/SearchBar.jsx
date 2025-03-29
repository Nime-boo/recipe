import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce effect to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      onSearch(debouncedQuery);
      updateSuggestions(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const updateSuggestions = (newQuery) => {
    setSuggestions((prev) => {
      const updated = [newQuery, ...prev.filter((q) => q !== newQuery)];
      return updated.slice(0, 5); // Store only the last 5 searches
    });
  };

  return (
    <div className="mb-4">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        {suggestions.length > 0 && (
          <ul className="border rounded-md bg-white shadow-md p-2">
            {suggestions.map((s, index) => (
              <li
                key={index}
                className="p-1 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setQuery(s);
                  onSearch(s);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;

