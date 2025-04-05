import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { userProfile } = useContext(AuthContext);
    console.log("ProtectedRoute: User Profile:", userProfile);

    if (!userProfile) {
        console.log("ProtectedRoute: User Profile is null, redirecting to /login");
        return <Navigate to="/login" />;
    }

    console.log("ProtectedRoute: User Profile exists, rendering children");
    return children;
};

export default ProtectedRoute;

