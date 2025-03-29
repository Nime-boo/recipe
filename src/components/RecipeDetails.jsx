import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals ? response.data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe)
    return <p className="text-center text-gray-600 text-lg font-semibold">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">{recipe.strMeal}</h1>
      
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-w-lg mx-auto rounded-lg shadow-md"
      />

      <div className="mt-6">
        <p className="text-lg text-gray-700">
          <strong>Category:</strong> {recipe.strCategory}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Cuisine:</strong> {recipe.strArea}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mt-6 text-gray-800">Ingredients</h2>
      <ul className="list-disc pl-6 space-y-1 text-gray-700">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return ingredient ? (
            <li key={i} className="flex items-center">
              <span className="mr-2 text-green-600">✔</span> {measure} {ingredient}
            </li>
          ) : null;
        })}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 text-gray-800">Instructions</h2>
      <p className="mt-2 text-gray-700 leading-relaxed">{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Video Tutorial</h2>
          <div className="mt-2">
            <iframe
              className="w-full max-w-lg mx-auto rounded-lg shadow-md"
              height="315"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split("=")[1]}`}
              title="Recipe Video"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
