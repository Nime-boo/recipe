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
            navigate("/home");
        } else {
            alert("Incorrect email. Try again.");
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
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Log In</button>
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


