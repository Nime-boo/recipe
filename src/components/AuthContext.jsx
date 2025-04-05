import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [rerender, setRerender] = useState(false); // Force rerender

    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem("userProfile");
            if (savedProfile) {
                setUserProfile(JSON.parse(savedProfile));
                console.log("AuthContext: User Profile Loaded:", JSON.parse(savedProfile));
            } else {
                console.log("AuthContext: User Profile Loaded: null");
            }
        } catch (error) {
            console.error("AuthContext: Error loading user profile:", error);
        }
    }, []);

    const login = (profile) => {
        try {
            console.log("AuthContext: Login Profile:", profile);
            localStorage.setItem("userProfile", JSON.stringify(profile));
            setUserProfile(profile);
            setRerender(!rerender); // Force rerender
            console.log("AuthContext: setUserProfile called with:", profile);
            console.log("AuthContext: Login Successful");
        } catch (error) {
            console.error("AuthContext: Error in login:", error);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem("userProfile");
            setUserProfile(null);
            console.log("AuthContext: Logout Successful");
        } catch (error) {
            console.error("AuthContext: Error removing user profile:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ userProfile, login, logout, rerender }}>
            {children}
        </AuthContext.Provider>
    );
};


