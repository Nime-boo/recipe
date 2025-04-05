// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ThemeProvider from "./ThemeContext";
import { AuthProvider } from "./components/AuthContext";
import { ShoppingListProvider } from "./components/ShoppingListContext"; // ✅ Import the context
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <ShoppingListProvider> {/* ✅ Wrap App with ShoppingListProvider */}
                        <App />
                    </ShoppingListProvider>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);


