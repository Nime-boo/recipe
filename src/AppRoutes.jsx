import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";
import ProfileSetup from "./components/ProfileSetup"; // Import ProfileSetup
import ShoppingList from "./components/ShoppingList"; // Import ShoppingList page

const AppRoutes = () => {
  // Check if userProfile exists in localStorage
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  return (
    <Routes>
      {/* If the userProfile exists, show Home; else show ProfileSetup */}
      <Route path="/" element={userProfile ? <Home /> : <ProfileSetup />} />
      
      {/* Recipe Details page */}
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      
      {/* Favorites page */}
      <Route path="/favorites" element={<Favorites />} />
      
      {/* Profile Setup page */}
      <Route path="/profile-setup" element={<ProfileSetup />} />
      
      {/* Shopping List page - Only available after user is logged in */}
      <Route path="/shopping-list" element={userProfile ? <ShoppingList /> : <ProfileSetup />} />
    </Routes>
  );
};

export default AppRoutes;

