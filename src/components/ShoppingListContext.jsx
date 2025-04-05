import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context for the shopping list
const ShoppingListContext = createContext();

// Context provider to manage the shopping list state
export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);

  // Load shopping list from localStorage when the component mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setShoppingList(stored);
  }, []);

  // Save shopping list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Add item to shopping list
  const addToShoppingList = (item) => {
    const existingItem = shoppingList.find((existing) => existing.name === item.name);
    if (existingItem) {
      // If the item exists, increase its quantity
      setShoppingList((prev) =>
        prev.map((existing) =>
          existing.name === item.name
            ? { ...existing, quantity: existing.quantity + 1 }
            : existing
        )
      );
    } else {
      // If the item doesn't exist, add it to the list
      setShoppingList((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  // Update quantity of an item
  const updateQuantity = (index, quantity) => {
    const newList = [...shoppingList];
    newList[index].quantity = Math.max(1, parseInt(quantity, 10) || 1); // Ensure quantity is at least 1
    setShoppingList(newList);
  };

  // Remove item from shopping list
  const removeItem = (index) => {
    setShoppingList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        addToShoppingList,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

// Custom hook to use the shopping list context
export const useShoppingList = () => useContext(ShoppingListContext);


