import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;

