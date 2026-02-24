"use client";

import { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<Item[]>(itemsData);

  function handleAddItem(newItem: { name: string; quantity: number; category: string }) {
    const item: Item = {
      id: Date.now().toString(),
      ...newItem
    };
    setItems([...items, item]);
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Shopping List
        </h1>
        <div className="mb-8">
          <NewItem onAddItem={handleAddItem} />
        </div>
        <ItemList items={items} />
      </div>
    </main>
  );
}
