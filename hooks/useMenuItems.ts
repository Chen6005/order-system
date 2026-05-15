import { useEffect, useState } from "react";

import { subscribeToMenuItems } from "@/lib/menu-service";
import type { MenuItem } from "@/lib/types";

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuError, setMenuError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToMenuItems(
      (items) => {
        setMenuItems(items);
        setIsLoading(false);
      },
      () => {
        setMenuError("菜單讀取失敗");
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return {
    isLoading,
    menuError,
    menuItems,
  };
}
