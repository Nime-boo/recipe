// components/ProtectedRoute.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { userProfile, setUserProfile } = useContext(AuthContext);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        if (!userProfile) {
            const storedUserProfile = localStorage.getItem("userProfile");
            if (storedUserProfile) {
                try {
                    const parsedProfile = JSON.parse(storedUserProfile);
                    setUserProfile(parsedProfile);
                    console.log("ProtectedRoute: Restored user profile from localStorage.");
                } catch (error) {
                    console.error("ProtectedRoute: Failed to parse stored user profile.", error);
                }
            }
        }
        setCheckingAuth(false);
    }, [userProfile, setUserProfile]);

    if (checkingAuth) return null;

    if (!userProfile) {
        console.log("ProtectedRoute: No user profile found, redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    
    return children;
};

export default ProtectedRoute;


