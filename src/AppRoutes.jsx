import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ProfileSetup from "./components/ProfileSetup";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
    const storedProfile = localStorage.getItem("userProfile");

    return (
        <Routes>
            <Route
                path="/"
                element={!storedProfile ? <Navigate to="/signup" replace /> : <Navigate to="/home" replace />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfileSetup />} />
            <Route path="/my-profile" element={<ProfilePage />} />

            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/recipe/:id"
                element={
                    <ProtectedRoute>
                        <RecipeDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/favorites"
                element={
                    <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;


