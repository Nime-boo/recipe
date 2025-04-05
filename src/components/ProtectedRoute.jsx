import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    console.log("ProtectedRoute: localStorage userProfile:", localStorage.getItem("userProfile"));
    console.log("ProtectedRoute: Before Context");
    const { userProfile } = useContext(AuthContext);
    console.log("ProtectedRoute: After Context, userProfile:", userProfile);

    if (!userProfile) {
        console.log("ProtectedRoute: User Profile is null, redirecting to /login");
        return <Navigate to="/login" />;
    }

    console.log("ProtectedRoute: User Profile exists, rendering children");
    return children;
};

export default ProtectedRoute;


