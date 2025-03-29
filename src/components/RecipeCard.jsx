import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden border">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="w-full h-48 object-cover rounded-t-2xl" 
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{recipe.strMeal}</h3>
        <p className="text-sm text-gray-600">Category: <span className="font-medium">{recipe.strCategory}</span></p>
        <p className="text-sm text-gray-600">Cuisine: <span className="font-medium">{recipe.strArea}</span></p>
        <Link 
          to={`/recipe/${recipe.idMeal}`} 
          className="block mt-3 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
