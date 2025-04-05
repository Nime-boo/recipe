import React, { createContext, useContext, useEffect, useState } from "react";

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setShoppingList(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const addToShoppingList = (itemName) => {
    const existingItem = shoppingList.find((item) => item.name === itemName);
    if (existingItem) {
      // Optional: Increment quantity if already in list
      setShoppingList((prev) =>
        prev.map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setShoppingList((prev) => [
        ...prev,
        { name: itemName, measure: "", quantity: 1 },
      ]);
    }
  };

  const updateQuantity = (index, quantity) => {
    const newList = [...shoppingList];
    newList[index].quantity = Math.max(1, parseInt(quantity, 10) || 1);
    setShoppingList(newList);
  };

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

export const useShoppingList = () => useContext(ShoppingListContext);
