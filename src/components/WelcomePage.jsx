// src/components/WelcomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();

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