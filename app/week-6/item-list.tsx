"use client"; 

import { useState } from "react";
import Item from "./item";

interface ItemListProps {
  items: Array<{ id: string; name: string; quantity: number; category: string }>;
}

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category" || sortBy === "group") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = sortBy === "group" 
    ? sortedItems.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {} as Record<string, typeof items>)
    : null;

  return (
    <div>
      <h1>Shopping List</h1>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            sortBy === "name"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            sortBy === "category"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setSortBy("group")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            sortBy === "group"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Group by Category
        </button>
      </div>
      {sortBy === "group" ? (
        <div>
          {Object.keys(groupedItems || {}).map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-xl font-bold capitalize text-gray-700 mb-3">{category}</h2>
              <ul>
                {groupedItems?.[category].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
