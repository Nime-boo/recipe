import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again.");
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to the Recipe App</h1>
      <p className="text-center text-gray-600">Discover amazing recipes and try them at home!</p>
      
      <SearchBar onSearch={setSearchQuery} />
      
      {loading && <p className="text-center text-gray-600">Loading recipes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {recipes.length > 0 ? (
          recipes.map((meal) => (
            <RecipeCard key={meal.idMeal} recipe={meal} />
          ))
        ) : (
          !loading && <p className="text-center text-gray-600 col-span-3">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
