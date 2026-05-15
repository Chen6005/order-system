import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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

export async function createMenuItem(item: MenuItem): Promise<void> {
  await setDoc(doc(db, menuItemsCollection, item.id), item);
}

export async function updateMenuItemAvailability(
  menuItemId: string,
  available: boolean,
): Promise<void> {
  await updateDoc(doc(db, menuItemsCollection, menuItemId), { available });
}

export async function archiveMenuItem(menuItemId: string): Promise<void> {
  await updateDoc(doc(db, menuItemsCollection, menuItemId), {
    archived: true,
    available: false,
  });
}

export async function updateMenuItem(
  menuItemId: string,
  updates: Partial<MenuItem>,
): Promise<void> {
  const {
    available,
    category,
    description,
    imageUrl,
    name,
    price,
    season,
  } = updates;

  await updateDoc(doc(db, menuItemsCollection, menuItemId), {
    ...(name !== undefined ? { name } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(price !== undefined ? { price } : {}),
    ...(category !== undefined ? { category } : {}),
    ...(season !== undefined ? { season } : {}),
    ...(imageUrl !== undefined ? { imageUrl } : {}),
    ...(available !== undefined ? { available } : {}),
  });
}
