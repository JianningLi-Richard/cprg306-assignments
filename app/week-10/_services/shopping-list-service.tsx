import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export async function getItems(userId: string) {
  const items: { id: string; [key: string]: any }[] = [];
  const itemsCollection = collection(db, "users", userId, "items");
  const q = query(itemsCollection);
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return items;
}

export async function addItem(userId: string, item: { name: string; quantity: number; category: string }) {
  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);
  return docRef.id;
}
