import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">Recipe Finder</h1>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-l-md"
        />
        <button onClick={fetchRecipes} className="bg-blue-500 text-white p-2 rounded-r-md">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
