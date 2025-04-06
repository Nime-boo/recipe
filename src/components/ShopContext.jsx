import React, { createContext, useState, useEffect } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });
  const [shoppingListCount, setShoppingListCount] = useState(
    shoppingList.length
  );

  // Update localStorage and count when shopping list changes
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    setShoppingListCount(shoppingList.length);
  }, [shoppingList]);

  return (
    <ShopContext.Provider
      value={{
        shoppingList,
        setShoppingList,
        shoppingListCount,
        setShoppingListCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContext };
