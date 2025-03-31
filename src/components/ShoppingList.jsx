import React, { useState, useEffect } from "react";

const ShoppingList = () => {
  const [items, setItems] = useState([]);

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
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-gray-100">
      <h2 className="text-xl font-bold mb-2">🛒 Shopping List</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">No ingredients added yet.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b">
              <span>{item.name} ({item.measure})</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(index, e.target.value)}
                className="border p-1 w-16 text-center"
              />
              <button onClick={() => removeItem(index)} className="text-red-500 ml-2">✖</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;
