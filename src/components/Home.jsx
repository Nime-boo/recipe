import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=" // Fetch random recipes
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the Recipe App</h1>
      <p>Discover amazing recipes and try them at home!</p>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              recipe={{
                id: meal.idMeal,
                title: meal.strMeal,
                description: meal.strCategory,
                image: meal.strMealThumb,
              }}
            />
          ))
        ) : (
          <p>Loading recipes...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
