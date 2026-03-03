"use client";

import { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<Item[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState<string>('');

  function handleAddItem(newItem: { name: string; quantity: number; category: string }) {
    const item: Item = {
      id: Date.now().toString(),
      ...newItem
    };
    setItems([...items, item]);
  }

  function handleItemSelect(itemName: string) {
    // Clean up the item name by removing emojis and size/weight info
    const cleanedName = itemName
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
      .split(",")[0]
      .trim()
      .toLowerCase();
    
    setSelectedItemName(cleanedName);
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto flex gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Shopping List
          </h1>
          <div className="mb-8">
            <NewItem onAddItem={handleAddItem} />
          </div>
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
