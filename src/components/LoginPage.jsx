import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const stored = localStorage.getItem("userProfile");
        const user = stored ? JSON.parse(stored) : null;

        console.log("LoginPage: localStorage userProfile:", localStorage.getItem("userProfile"));
        console.log("LoginPage: Stored User:", user);
        console.log("LoginPage: Input Email:", email);

        if (user && user.email) {
            console.log("LoginPage: Stored User Email:", user.email);
            if (user.email.toLowerCase().trim() === email.toLowerCase().trim()) {
                console.log("LoginPage: Login Successful");
                login(user);
                navigate("/my-profile");
            } else {
                alert("Invalid email. Please try again.");
            }
        } else {
            alert("Invalid email. Please try again.");
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Log In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Log In
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

export default LoginPage;



