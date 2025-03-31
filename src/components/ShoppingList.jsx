import React, { useState, useEffect } from "react";

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Load shopping list from localStorage
    const savedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setItems(savedItems);
  }, []);

  useEffect(() => {
    // Update localStorage when items change
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const updateQuantity = (index, quantity) => {
    const newList = [...items];
    newList[index].quantity = quantity;
    setItems(newList);
  };

  const removeItem = (index) => {
    const updatedList = items.filter((_, i) => i !== index);
    setItems(updatedList);
  };

  const clearShoppingList = () => {
    setItems([]);
    localStorage.removeItem("shoppingList");
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
                value={item.quantity || 1}
                min="1"
                onChange={(e) => updateQuantity(index, e.target.value)}
                className="border p-1 w-16 text-center"
              />
              <button onClick={() => removeItem(index)} className="text-red-500 ml-2">✖</button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-4 flex space-x-4">
          <button
            onClick={clearShoppingList}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear List
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Print List
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
