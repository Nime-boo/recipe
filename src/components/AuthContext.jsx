import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      // Optionally, display an error message to the user
    }
  }, []);

  const login = (profile) => {
    try {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      setUserProfile(profile);
    } catch (error) {
      console.error("Error saving user profile:", error);
      // Optionally, display an error message to the user
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("userProfile");
      setUserProfile(null);
    } catch (error) {
      console.error("Error removing user profile:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <AuthContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

