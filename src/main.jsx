import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Fixed missing import
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router> {/* ✅ Ensure only ONE <Router> exists */}
      <App />
    </Router>
  </React.StrictMode>
);
