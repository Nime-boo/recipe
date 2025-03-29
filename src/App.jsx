import React, { useContext } from "react";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar";
import { ThemeContext } from "./ThemeContext"; // Import ThemeContext

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}`}>
      <NavBar />
      <AppRoutes />
    </div>
  );
};

export default App;
