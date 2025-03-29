import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";
import RecipeCard from "./components/RecipeCard";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;