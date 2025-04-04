import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const { theme } = useContext(ThemeContext); // Get theme context

  // Load shopping list from localStorage on mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setItems(savedItems);
  }, []);

  // Update localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const updateQuantity = (index, quantity) => {
    const newList = [...items];
    newList[index].quantity = Math.max(1, parseInt(quantity, 10) || 1);
    setItems(newList);
  };

  const removeItem = (index) => {
    const updatedList = items.filter((_, i) => i !== index);
    setItems(updatedList);
  };

  return (
    <div className={`mt-8 p-4 border rounded-lg shadow-md transition-all duration-300 
      ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"}`}>
      <h2 className="text-xl font-bold mb-2">🛒 Shopping List</h2>

      {items.length === 0 ? (
        <p className={`transition-all duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          No ingredients added yet.
        </p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li 
              key={index} 
              className={`flex justify-between items-center py-2 border-b transition-all duration-300 
                ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
              <span>{item.name} ({item.measure})</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(index, e.target.value)}
                className={`border p-1 w-16 text-center transition-all duration-300 
                  ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" 
                                     : "bg-white text-black border-gray-300"}`}
              />
              <button 
                onClick={() => removeItem(index)} 
                className={`ml-2 p-1 rounded transition-all duration-300 
                  ${theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"}`}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;
