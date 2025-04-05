import React, { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import AuthContext
import AppRoutes from "./AppRoutes.jsx";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/ProfilePage"; // Import ProfilePage component
import Footer from "./components/Footer";
import ShoppingList from "./components/ShoppingList"; // Import ShoppingList component

const App = () => {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  // Local state for shopping list and its count
  const [shoppingList, setShoppingList] = useState([]);
  const [shoppingListCount, setShoppingListCount] = useState(0);

  // Load shopping list from localStorage on initial load
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setShoppingList(storedList);
    setShoppingListCount(storedList.length);
  }, []);

  // Function to handle adding items to the shopping list
  const addToShoppingList = (ingredients) => {
    const updatedList = [...shoppingList, ...ingredients];
    // Remove duplicates based on ingredient name
    const uniqueList = updatedList.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );

    setShoppingList(uniqueList);
    setShoppingListCount(uniqueList.length); // Update shopping list count
    // Save updated list to localStorage
    localStorage.setItem("shoppingList", JSON.stringify(uniqueList));
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {showNavBar && <NavBar shoppingListCount={shoppingListCount} />}
          <Routes>
            <Route path="/*" element={<AppRoutes addToShoppingList={addToShoppingList} />} />
            {/* ProfilePage is wrapped with ProtectedRoute to ensure authentication */}
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/* Route for shopping list */}
            <Route
              path="/shopping-list"
              element={<ShoppingList shoppingList={shoppingList} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;



