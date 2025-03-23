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

  if (!recipe) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full max-w-md mx-auto my-4 rounded-md" />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Cuisine:</strong> {recipe.strArea}</p>
      <h2 className="text-xl font-bold mt-4">Ingredients</h2>
      <ul className="list-disc pl-6">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return ingredient ? <li key={i}>{measure} {ingredient}</li> : null;
        })}
      </ul>
      <h2 className="text-xl font-bold mt-4">Instructions</h2>
      <p>{recipe.strInstructions}</p>
      {recipe.strYoutube && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Video Tutorial</h2>
          <iframe
            className="w-full max-w-lg mx-auto"
            height="315"
            src={`https://www.youtube.com/embed/${recipe.strYoutube.split("=")[1]}`}
            title="Recipe Video"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
