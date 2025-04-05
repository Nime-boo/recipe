import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { useShoppingList } from "./ShoppingListContext"; // ✅ Import context

const ShoppingList = () => {
  const { theme } = useContext(ThemeContext);
  const { shoppingList, updateQuantity, removeItem } = useShoppingList(); // ✅ Use global state

  return (
    <div
      className={`mt-8 p-4 border rounded-lg shadow-md transition-all duration-300 
        ${theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"}`}
    >
      <h2 className="text-xl font-bold mb-2">🛒 Shopping List</h2>

      {shoppingList.length === 0 ? (
        <p
          className={`transition-all duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          No ingredients added yet.
        </p>
      ) : (
        <ul>
          {shoppingList.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center py-2 border-b transition-all duration-300 
                ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
            >
              <span>{item.name} {item.measure && `(${item.measure})`}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(index, e.target.value)}
                className={`border p-1 w-16 text-center transition-all duration-300 
                  ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
              />
              <button
                onClick={() => removeItem(index)}
                className={`ml-2 p-1 text-sm bg-red-500 text-white rounded hover:bg-red-600`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;


