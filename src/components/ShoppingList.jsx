import React from "react";

const ShoppingList = ({ items, setItems }) => {
  const updateQuantity = (index, quantity) => {
    const newList = [...items];
    newList[index].quantity = quantity;
    setItems(newList);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-gray-100">
      <h2 className="text-xl font-bold mb-2">Shopping List</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">No ingredients added yet.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b">
              <span>{item.name}</span>
              <input
                type="text"
                value={item.quantity}
                onChange={(e) => updateQuantity(index, e.target.value)}
                className="border p-1 w-16 text-center"
              />
              <button onClick={() => removeItem(index)} className="text-red-500 ml-2">✖</button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
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
