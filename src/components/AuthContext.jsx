import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    // Load profile from localStorage on first render
    useEffect(() => {
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
            try {
                const parsedProfile = JSON.parse(savedProfile);
                setUserProfile(parsedProfile);  // Set the user profile in the context state
                console.log("AuthContext: User Profile Loaded:", parsedProfile);
            } catch (error) {
                console.error("AuthContext: Failed to parse saved userProfile", error);
            }
        } else {
            console.log("AuthContext: No user profile found.");
        }
    }, []);

    // Login function: save to context and localStorage
    const login = (profile) => {
        try {
            setUserProfile(profile); // Update context state
            localStorage.setItem("userProfile", JSON.stringify(profile)); // Save profile to localStorage
            console.log("AuthContext: User logged in:", profile);
        } catch (error) {
            console.error("AuthContext: Login Error:", error);
        }
    };

    // Logout function: remove from context and localStorage
    const logout = () => {
        try {
            localStorage.removeItem("userProfile");  // Remove profile from localStorage
            setUserProfile(null);  // Clear the user profile from context
            console.log("AuthContext: User logged out");
        } catch (error) {
            console.error("AuthContext: Logout Error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ userProfile, setUserProfile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



