import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export async function getItems(userId: string) {
  const items: Item[] = [];
  const itemsCollection = collection(db, "users", userId, "items");
  const q = query(itemsCollection);
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data() as Omit<Item, "id">;
    items.push({
      id: doc.id,
      ...data
    });
  });

  return items;
}

export async function addItem(userId: string, item: { name: string; quantity: number; category: string }) {
  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);
  return docRef.id;
}
