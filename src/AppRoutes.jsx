import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";
import RecipeCard from "./components/RecipeCard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/recipe-card" element={<RecipeCard />} />
    </Routes>
  );
};

export default AppRoutes;
