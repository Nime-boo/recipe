import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Favorite Recipes</h1>
      
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 mt-4">No favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {favorites.map((recipe) =>
            recipe ? <RecipeCard key={recipe.idMeal} recipe={recipe} /> : null
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
