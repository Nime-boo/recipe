import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form); // Save to context and localStorage
    navigate("/profile"); // Go to profile setup
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} value={form.name} placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input name="email" onChange={handleChange} value={form.email} type="email" placeholder="Email" className="w-full border p-2 rounded" required />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;

