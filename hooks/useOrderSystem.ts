import { useEffect, useState } from "react";

import {
  createOrder,
  subscribeToOrder,
  subscribeToOrders,
  updateOrderStatus as updateStoredOrderStatus,
} from "@/lib/order-service";
import type { CartItem, MenuItem, Order, OrderStatus } from "@/lib/types";

const latestOrderStorageKey = "latestOrderId";

export function useOrderSystem(isAdminAuthenticated: boolean) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [latestOrderId, setLatestOrderId] = useState("");
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isTrackingOrder, setIsTrackingOrder] = useState(false);
  const [orderTrackingError, setOrderTrackingError] = useState("");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (!isAdminAuthenticated) {
      queueMicrotask(() => setOrders([]));
      return;
    }

    const unsubscribe = subscribeToOrders(setOrders, (error) => {
      console.error("Failed to subscribe to orders from Firestore.", error);
    });

    return unsubscribe;
  }, [isAdminAuthenticated]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedOrderId = window.localStorage.getItem(latestOrderStorageKey);

    if (storedOrderId) {
      queueMicrotask(() => setLatestOrderId(storedOrderId));
    }
  }, []);

  useEffect(() => {
    if (!latestOrderId) {
      queueMicrotask(() => {
        setLatestOrder(null);
        setIsTrackingOrder(false);
        setOrderTrackingError("");
      });
      return;
    }

    queueMicrotask(() => {
      setIsTrackingOrder(true);
      setOrderTrackingError("");
    });

    const unsubscribe = subscribeToOrder(
      latestOrderId,
      (order) => {
        setLatestOrder(order);
        setIsTrackingOrder(false);
        setOrderTrackingError(order ? "" : "找不到最近一筆訂單。");
      },
      () => {
        setLatestOrder(null);
        setIsTrackingOrder(false);
        setOrderTrackingError("訂單追蹤讀取失敗，請稍後再試。");
      },
    );

    return unsubscribe;
  }, [latestOrderId]);

  function addToCart(menuItem: MenuItem) {
    setCheckoutSuccess(false);
    setOrderError("");
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.menuItemId === menuItem.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(menuItemId: string) {
    setCheckoutSuccess(false);
    setOrderError("");
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseQuantity(menuItemId: string) {
    setCheckoutSuccess(false);
    setOrderError("");
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  async function checkout() {
    if (cartItems.length === 0) {
      return false;
    }

    setOrderError("");

    const newOrder: Order = {
      id: Date.now().toString(),
      items: cartItems,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    try {
      await createOrder(newOrder);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(latestOrderStorageKey, newOrder.id);
      }
      setLatestOrderId(newOrder.id);
      setLatestOrder(newOrder);
      setOrderTrackingError("");
      setCheckoutSuccess(true);
      setCartItems([]);
      return true;
    } catch {
      setCheckoutSuccess(false);
      setOrderError("訂單送出失敗，請稍後再試。");
      return false;
    }
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      await updateStoredOrderStatus(orderId, status);
    } catch (error) {
      console.error("Failed to update order status in Firestore.", error);
    }
  }

  function dismissCheckoutSuccess() {
    setCheckoutSuccess(false);
  }

  return {
    addToCart,
    cartCount,
    cartItems,
    cartTotal,
    checkout,
    checkoutSuccess,
    dismissCheckoutSuccess,
    decreaseQuantity,
    increaseQuantity,
    isTrackingOrder,
    latestOrder,
    latestOrderId,
    orderError,
    orderTrackingError,
    orders,
    updateOrderStatus,
  };
}
