import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-md"
        />
        <h2 className="text-xl font-semibold mt-2">{recipe.strMeal}</h2>
        <p className="text-gray-600">{recipe.strCategory} | {recipe.strArea}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
