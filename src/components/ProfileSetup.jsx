import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProfileSetup = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        dietaryPreference: "",
        race: "",
        gender: "",
        age: "",
        location: "",
        allergies: "",
    });
    const [profileCreated, setProfileCreated] = useState(false); // New state to track profile creation

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProfile = { ...profile, profileCompleted: true };
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        console.log("ProfileSetup: localStorage after setup:", localStorage.getItem("userProfile"));
        login(updatedProfile);
        console.log("ProfileSetup: Login called");
        setProfileCreated(true); // Set profileCreated to true
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            {profileCreated ? (
                <div className="text-center">
                    <p className="text-lg font-semibold mb-4">Profile Created!</p>
                    <button
                        onClick={handleLoginRedirect}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Go to Login
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input fields and dropdowns as before */}
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="w-full border p-2 rounded"
                        />

                        <select
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer not to say">Prefer not to say</option>
                        </select>

                        <select
                            name="race"
                            value={profile.race}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Race</option>
                            <option value="african">African</option>
                            <option value="asian">Asian</option>
                            <option value="caucasian">Caucasian</option>
                            <option value="hispanic">Hispanic</option>
                            <option value="other">Other</option>
                            <option value="prefer not to say">Prefer not to say</option>
                        </select>

                        <input
                            type="number"
                            name="age"
                            value={profile.age}
                            onChange={handleChange}
                            placeholder="Age"
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            name="allergies"
                            value={profile.allergies}
                            onChange={handleChange}
                            placeholder="Allergies (e.g. Nuts, Dairy)"
                            className="w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            name="dietaryPreference"
                            value={profile.dietaryPreference}
                            onChange={handleChange}
                            placeholder="Dietary Preference (e.g. Vegan, Keto)"
                            className="w-full border p-2 rounded"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Save & Continue
                        </button>
                    </form>
                    <button
                        onClick={handleBack}
                        className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                    >
                        Back
                    </button>
                </>
            )}
        </div>
    );
};

export default ProfileSetup;

