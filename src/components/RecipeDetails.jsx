import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response.data.meals) {
        setRecipe(response.data.meals[0]);
      } else {
        setError("Recipe not found.");
      }
    } catch (err) {
      setError("Failed to fetch recipe details. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchRecipeDetails}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-center mt-4">{recipe.strMeal}</h1>
      <p className="text-center text-gray-600">
        {recipe.strCategory} | {recipe.strArea}
      </p>

      <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />

        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold">Ingredients:</h2>
          <ul className="list-disc pl-5">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
              const ingredient = recipe[`strIngredient${num}`];
              const measure = recipe[`strMeasure${num}`];
              return ingredient ? (
                <li key={num}>
                  {measure} {ingredient}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6">Instructions:</h2>
      <p className="whitespace-pre-line text-gray-700">{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Watch Video:</h2>
          <div className="relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={recipe.strYoutube.replace("watch?v=", "embed/")}
              title="Recipe Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {recipe.strSource && (
        <a
          href={recipe.strSource}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-500 hover:underline text-center"
        >
          View Full Recipe on TheMealDB
        </a>
      )}
    </div>
  );
};

export default RecipeDetails;
