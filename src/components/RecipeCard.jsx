import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
      <Link to={`/recipe/${recipe.idMeal}`} className="block">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-md"
        />
        <h2 className="text-xl font-semibold mt-2">{recipe.strMeal}</h2>
        <p className="text-gray-600">{recipe.strCategory} | {recipe.strArea}</p>
      </Link>
      <Link 
        to={`/recipe/${recipe.idMeal}`} 
        className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default RecipeCard;

