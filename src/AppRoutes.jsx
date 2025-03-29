import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // ✅ Ensure correct path
import RecipeDetails from "./components/RecipeDetails"; // ✅ Ensure correct path

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
};

export default AppRoutes;
