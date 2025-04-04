import React, { useState, useEffect, useCallback } from "react"; 
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

  // Fetch recipes when searchQuery changes 
  useEffect(() => { 
    const query = searchQuery.trim() || "chicken"; // Default search query 
    const debounceTimeout = setTimeout(() => { 
      fetchRecipes(query); 
    }, 500); // Debounce API call 

    return () => clearTimeout(debounceTimeout); 
  }, [searchQuery, fetchRecipes]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to the Recipe App</h1>
      <p className="text-center text-gray-600">Discover amazing recipes and try them at home!</p>

      <SearchBar onSearch={setSearchQuery} />

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
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {recipes.length > 0 ? (
            recipes.map((meal) => (
              <RecipeCard key={meal.idMeal} recipe={meal} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No recipes found.</p>
          )}
        </div>
      )}
      
    </div>
  );
};

export default Home;

