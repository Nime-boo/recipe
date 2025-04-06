import React, { useEffect } from "react";
import { useShop } from "../hooks/useShopList";

const ShoppingList = () => {
  const { shoppingList, setShoppingList, setShoppingListCount } = useShop();

  useEffect(() => {
    // Load shopping list from localStorage on component mount
    const savedShoppingList =
      JSON.parse(localStorage.getItem("shoppingList")) || [];
    setShoppingList(savedShoppingList);
  }, [setShoppingList]);

  useEffect(() => {
    setShoppingListCount(shoppingList.length);
  }, [shoppingList, setShoppingListCount]);

  const updateQuantity = (index, quantity) => {
    const updatedList = [...shoppingList];
    updatedList[index].quantity = quantity;
    setShoppingList(updatedList);
  };

  const removeItem = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);

    // Update all states and storage synchronously
    setShoppingList(updatedList);
    setShoppingListCount(updatedList.length);
    localStorage.setItem("shoppingList", JSON.stringify(updatedList));

    // Dispatch custom event immediately after state updates
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("shoppingListUpdated"));
    });
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Your Shopping List</h2>
      {shoppingList.length === 0 ? (
        <p className="text-gray-600">No ingredients added yet.</p>
      ) : (
        <ul className="space-y-4">
          {shoppingList.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <span>
                {item.name} {item.measure && `(${item.measure})`}
              </span>
              <input
                type="number"
                value={item.quantity || ""}
                onChange={(e) => updateQuantity(index, e.target.value)}
                className="border p-1 w-16 text-center"
                placeholder="Qty"
              />
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 ml-2"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
      {shoppingList.length > 0 && (
        <button
          onClick={() => window.print()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Print List
        </button>
      )}
    </div>
  );
};

export default ShoppingList;


