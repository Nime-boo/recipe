import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";
import ProfileSetup from "./components/ProfileSetup";
import ShoppingList from "./components/ShoppingList";


const AppRoutes = () => {

  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  return (
    <Routes>

      <Route path="/" element={userProfile ? <Home /> : <ProfileSetup />} />

      <Route path="/recipe/:id" element={<RecipeDetails />} />

      <Route path="/favorites" element={<Favorites />} />

      <Route path="/profile-setup" element={<ProfileSetup />} /> {/* Profile setup route */}
      <Route path="/shopping-list" element={userProfile ? <ShoppingList /> : <ProfileSetup />} /> {/* Shopping List route */}
    </Routes>
  );
};

export default AppRoutes;

