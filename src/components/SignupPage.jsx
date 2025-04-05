import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const stored = localStorage.getItem("userProfile");
        const user = stored ? JSON.parse(stored) : null;

        // Added check for user being null
        if (user && user.email && user.email.toLowerCase() === email.toLowerCase()) {
            alert("Email already exists. Please log in.");
            navigate("/login");
            return;
        }

        console.log("SignupPage: Signup Email:", email);
        const profile = { email, profileCompleted: false };
        console.log("SignupPage: Profile to Login:", profile);
        login(profile);
        console.log("SignupPage: Signup Complete");
        console.log("SignupPage: localStorage after signup:", localStorage.getItem("userProfile"));
        navigate("/profile");
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    Sign Up
                </button>
            </form>
            <button
                onClick={handleBack}
                className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
                Back
            </button>
        </div>
    );
};

export default SignupPage;


