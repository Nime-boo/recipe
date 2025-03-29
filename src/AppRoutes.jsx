import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
};

export default AppRoutes;
