import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🚧 Check for profile setup
  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");
    if (!userProfile) {
      navigate("/profile");
    }
  }, [navigate]);

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
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-gray-700">{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
