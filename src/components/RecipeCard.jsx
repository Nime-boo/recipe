import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShoppingList } from "./ShoppingListContext"; // ✅ Import the shopping list context

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToShoppingList } = useShoppingList(); // ✅ Use the context to add to shopping list

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((fav) => fav.idMeal === recipe.idMeal));
  }, [recipe.idMeal]);

  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      savedFavorites = savedFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    } else {
      savedFavorites.push(recipe);
    }
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };

  const addToShoppingListHandler = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          name: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`] || "",
        });
      }
    }

    // Use the context method to add ingredients to the shopping list
    ingredients.forEach(item => addToShoppingList(item)); // ✅ Add each ingredient to the shopping list context
    alert("Ingredients added to shopping list!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
      <Link to={`/recipe/${recipe.idMeal}`} className="block">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-md"
        />
        <h2 className="text-xl font-semibold mt-2">{recipe.strMeal}</h2>
        <p className="text-gray-600 font-medium">{recipe.strCategory} | {recipe.strArea}</p>
      </Link>
      <div className="flex justify-between items-center mt-3">
        <button 
          onClick={addToShoppingListHandler} // ✅ Update function here
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          🛒 Add to List
        </button>
        <button 
          onClick={toggleFavorite} 
          className={`px-3 py-2 rounded-md ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
        >
          {isFavorite ? "❤️ Remove" : "♡ Favorite"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;


