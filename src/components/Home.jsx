import React, { useEffect, useState, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [categories, setCategories] = useState([]);

  // Function to fetch recipes with caching
  const fetchRecipes = useCallback(async (query) => {
    setLoading(true);
    setError(null);

    try {
      // Use localStorage to prevent unnecessary API calls
      const cacheKey = `recipes-${query}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setRecipes(JSON.parse(cachedData));
      } else {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const meals = response.data.meals || [];

        setRecipes(meals);
        localStorage.setItem(cacheKey, JSON.stringify(meals));
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to load recipes. Please check your internet connection.");
    }
    setLoading(false);
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch recipes when searchQuery changes
  useEffect(() => {
    const query = searchQuery.trim() || "chicken"; // Default search query
    const debounceTimeout = setTimeout(() => {
      fetchRecipes(query);
    }, 500); // Debounce API call

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, fetchRecipes]);

  // Fetch random meal
  const fetchRandomMeal = async () => {
    setLoading(true);
    setError(null);
    setRecipes([]); // Clear previous results

    try {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching random meal:", error);
      setError("Failed to load a random meal. Please try again.");
    }
    setLoading(false);
  };

  // Add ingredients to shopping list
  const addToShoppingList = (ingredients) => {
    setShoppingList((prevList) => [...prevList, ...ingredients]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to the Recipe App</h1>
      <p className="text-center text-gray-600">Discover amazing recipes and try them at home!</p>
      
      <SearchBar onSearch={setSearchQuery} />

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {categories.map((category) => (
          <button
            key={category.idCategory}
            onClick={() => setSearchQuery(category.strCategory)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 border rounded-md">
              <Skeleton height={200} />
              <Skeleton count={2} />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchRandomMeal}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {recipes.length > 0 ? (
            recipes.map((meal) => (
              <RecipeCard key={meal.idMeal} recipe={meal} onAddToShoppingList={addToShoppingList} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No recipes found.</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Shopping List</h2>
        {shoppingList.length > 0 ? (
          <ul className="list-disc pl-5">
            {shoppingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No items in the shopping list.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

