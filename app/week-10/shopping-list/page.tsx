"use client";

import { useEffect, useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from 'next/navigation';
import { getItems, addItem } from '../_services/shopping-list-service';

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string>('');

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  async function loadItems() {
    if (user) {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    }
  }

  async function handleAddItem(newItem: { name: string; quantity: number; category: string }) {
    if (user) {
      const itemId = await addItem(user.uid, newItem);
      const item: Item = {
        id: itemId,
        ...newItem
      };
      setItems([...items, item]);
    }
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
