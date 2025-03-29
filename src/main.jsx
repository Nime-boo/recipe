import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";
import ThemeProvider from "./ThemeContext"; // Import ThemeProvider
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider> {/* Wrap the app with ThemeProvider */}
    <BrowserRouter> {/* Keep BrowserRouter inside ThemeProvider */}
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
