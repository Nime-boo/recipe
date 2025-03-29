import React from "react";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar"; // Import NavBar

const App = () => {
  return (
    <div>
      <NavBar /> {/* Add NavBar here */}
      <AppRoutes />
    </div>
  );
};

export default App;
