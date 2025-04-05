// src/components/WelcomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Wait before showing UI

    useEffect(() => {
        const storedUser = localStorage.getItem("userProfile");

        if (storedUser) {
            // User already signed up/logged in
            navigate("/home");
        } else {
            // Allow UI to show for sign up or login
            setLoading(false);
        }
    }, [navigate]);

    if (loading) {
        return null; // Don’t show anything while checking
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Welcome to Our App!</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Sign Up
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;

