import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full rounded-md" />
      <h3 className="text-lg font-bold my-2">{recipe.strMeal}</h3>
      <p className="text-sm">Category: {recipe.strCategory}</p>
      <p className="text-sm">Cuisine: {recipe.strArea}</p>
      <Link to={`/recipe/${recipe.idMeal}`} className="block mt-2 text-blue-500">View Details</Link>
    </div>
  );
};

export default RecipeCard;
