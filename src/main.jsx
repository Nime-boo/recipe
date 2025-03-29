import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import "./index.css"; // Ensure global styles are loaded

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* Wrap everything here */}
    <App />
  </BrowserRouter>
);
