import React, { useEffect, useState, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const Home = ({ setShoppingListCount }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [shoppingList, setShoppingList] = useState(
    JSON.parse(localStorage.getItem("shoppingList")) || []
  );

  // Function to add ingredients to shopping list
  const handleAddToShoppingList = (recipe) => {
    const item = {
      id: recipe.idMeal,
      name: recipe.strMeal,
      ingredients: [
        recipe.strIngredient1,
        recipe.strIngredient2,
        recipe.strIngredient3,
        // Add more if needed
      ].filter(Boolean),
    };

    const updatedShoppingList = [...shoppingList, ...item.ingredients];
    setShoppingList(updatedShoppingList);
    localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));

    // Update shopping list count in the NavBar
    setShoppingListCount(updatedShoppingList.length);
  };

  const fetchRecipes = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
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

  useEffect(() => {
    const query = searchQuery.trim() || "chicken";
    const debounceTimeout = setTimeout(() => {
      fetchRecipes(query);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, fetchRecipes]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">🍽️ Welcome to Your Recipe Hub!</h1>
      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      {loading ? (
        <Skeleton count={5} height={200} />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="relative">
              <RecipeCard recipe={recipe} />
             
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;



