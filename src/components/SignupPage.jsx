import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SignupPage: Signup Email:", email);
        const profile = { email };
        console.log("SignupPage: Profile to Login:", profile);
        login(profile);
        console.log("SignupPage: Signup Complete");
        navigate("/login");
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
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
        </div>
    );
};

export default SignupPage;
