import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useShoppingList } from "./ShoppingListContext"; // ✅ Import context

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { addToShoppingList } = useShoppingList(); // ✅ Use context

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // ✅ Add recipe's ingredients to shopping list
  const handleAddToShoppingList = (recipe) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`.trim());
      }
    }

    ingredients.forEach((item) => addToShoppingList(item));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 mt-4">No favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {favorites.map((recipe) =>
            recipe ? (
              <div key={recipe.idMeal} className="relative">
                <RecipeCard recipe={recipe} />
                <button
                  onClick={() => handleAddToShoppingList(recipe)}
                  className="mt-2 w-full bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700"
                >
                  Add to Shopping List
                </button>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
