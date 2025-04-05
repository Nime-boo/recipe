import { createContext, useState, useEffect } from "react";

// Create the ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component to wrap your app and provide theme state
const ThemeProvider = ({ children }) => {
  // Get the current theme from localStorage or default to "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Update the theme class on the document element and store it in localStorage
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme); // Persist theme in localStorage
  }, [theme]); // Only run this effect when the theme changes

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
