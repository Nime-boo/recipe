import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    preference: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      // Optionally show this only after form submission
      console.log("User already has a profile");
      // Don't auto-navigate unless you're blocking the route
      // navigate("/"); 
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email } = profile;
    if (!name || !email) {
      alert("Please complete all required fields.");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));
    navigate("/"); // Redirect to homepage after saving
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">👤 Set Up Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded"
            required
          />
          <input
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 border rounded"
            required
          />
          <select
            name="preference"
            value={profile.preference}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="">Select Dietary Preference (Optional)</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Keto">Keto</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;


