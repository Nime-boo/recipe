import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { userProfile } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log("ProtectedRoute: User Profile:", userProfile);
        console.log("ProtectedRoute: AuthContext:", AuthContext); // Check Context
        if (userProfile) {
            console.log("ProtectedRoute: User Profile exists.");
            setIsAuthenticated(true);
        } else {
            console.log("ProtectedRoute: User Profile does not exist.");
            setIsAuthenticated(false);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, [userProfile]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        console.log("ProtectedRoute: Not Authenticated, Redirecting to Login");
        return <Navigate to="/login" />;
    }

    console.log("ProtectedRoute: Authenticated, Rendering Children");
    return children;
};

export default ProtectedRoute;

