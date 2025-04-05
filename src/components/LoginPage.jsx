import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const stored = localStorage.getItem("userProfile");
        console.log("LoginPage: Stored Profile:", stored);

        if (!stored) {
            alert("No user found. Please sign up first.");
            return;
        }

        const user = JSON.parse(stored);
        console.log("LoginPage: Parsed User:", user);
        console.log("LoginPage: Entered Email:", email);

        if (user.email.toLowerCase() === email.toLowerCase()) {
            login(user);

            // Check if profile is complete (adjust condition as needed)
            if (user.profileCompleted) { // Replace with your completion check
                navigate("/home");
            } else {
                navigate("/profile");
            }
        } else {
            alert("Incorrect email. Try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;

