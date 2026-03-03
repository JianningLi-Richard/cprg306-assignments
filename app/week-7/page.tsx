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
    // Clean up the item name by removing size/weight info and emojis
    const cleanedName = itemName
      .split(',')
      .map(part => part.trim())
      .at(0) || ''
      .toLowerCase()
      .replace(/(\u{1F300}-\u{1F9FF}|\u{2600}-\u{27BF}|\u{2300}-\u{23FF}|\u{2000}-\u{206F}|\u{3000}-\u{303F})/gu, '')
      .trim();
    
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
