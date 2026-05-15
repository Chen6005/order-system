import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

import { db } from "./firebase";
import { menuItems } from "./mock-data";
import type { MenuItem } from "./types";

const menuItemsCollection = "menuItems";

export function subscribeToMenuItems(
  callback: (menuItems: MenuItem[]) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    collection(db, menuItemsCollection),
    (snapshot) => {
      const menuItems = snapshot.docs.map(
        (menuItemDoc) =>
          ({
            id: menuItemDoc.id,
            ...menuItemDoc.data(),
          }) as MenuItem,
      );

      callback(menuItems);
    },
    onError,
  );
}

export async function seedMenuItems(): Promise<void> {
  await Promise.all(
    menuItems.map((item) =>
      setDoc(doc(db, menuItemsCollection, item.id), item),
    ),
  );
}
