// src/App.jsx
import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/Home.jsx";
import Footer from "./components/Footer";
import { ShoppingListProvider } from "./components/ShoppingListContext";


const App = () => {
    const location = useLocation();
    const showNavBar = location.pathname !== "/";

    return (
        <div className="flex flex-col min-h-screen"> {/* Add flex container and min-h-screen */}
            <div className="flex-grow"> {/* Add flex-grow to main content */}
                {showNavBar && <NavBar />}
                <Routes>
                    <Route path="/*" element={<AppRoutes />} />
                    <Route path="/my-profile" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                </Routes>
            </div>
            <Footer />
        </div>
    );

    <ShoppingListProvider>
  <App />
</ShoppingListProvider>
};

export default App;


