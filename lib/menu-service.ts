import { collection, onSnapshot } from "firebase/firestore";

import { db } from "./firebase";
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
