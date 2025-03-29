import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // ✅ Make sure this is imported!
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
