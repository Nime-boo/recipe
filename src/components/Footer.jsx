import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
        </p>
        <p className="mt-2 text-xs">
          Contact us: recipeapp@example.com | +234 800 000 0000
        </p>
      </div>
    </footer>
  );
};

export default Footer;
