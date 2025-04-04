import React, { useContext } from "react";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar";
import { ThemeContext } from "./ThemeContext";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer"; // ← assuming you'll create this

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"} flex flex-col`}>
      <NavBar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <ShoppingList />
      <Footer /> {/* Add contact and links later */}
    </div>
  );
};

export default App;
