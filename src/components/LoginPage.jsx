import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const { login } = useContext(AuthContext); // Use login function from AuthContext
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedEmail = email.toLowerCase().trim();
        if (!trimmedEmail) {
            alert("Please enter a valid email address.");
            return;
        }

        // Example user object, replace this logic with real authentication
        const user = {
            email: trimmedEmail,
            name: trimmedEmail.split("@")[0], // Just a sample name from email
        };

        console.log("LoginPage: Logging in user:", user);
        login(user); // Call login function from context
        navigate("/home"); // Redirect after login
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
