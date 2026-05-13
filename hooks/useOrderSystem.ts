import { useEffect, useState } from "react";

import {
  createOrder,
  subscribeToOrders,
  updateOrderStatus as updateStoredOrderStatus,
} from "@/lib/order-service";
import type { CartItem, MenuItem, Order, OrderStatus } from "@/lib/types";

export function useOrderSystem() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    const unsubscribe = subscribeToOrders(setOrders, (error) => {
      console.error("Failed to subscribe to orders from Firestore.", error);
    });

    return unsubscribe;
  }, []);

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
      return;
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
      setOrders((currentOrders) => [...currentOrders, newOrder]);
      setCheckoutSuccess(true);
      setCartItems([]);
    } catch {
      setCheckoutSuccess(false);
      setOrderError("訂單送出失敗，請稍後再試。");
    }
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      await updateStoredOrderStatus(orderId, status);
    } catch (error) {
      console.error("Failed to update order status in Firestore.", error);
    }
  }

  return {
    addToCart,
    cartCount,
    cartItems,
    cartTotal,
    checkout,
    checkoutSuccess,
    decreaseQuantity,
    increaseQuantity,
    orderError,
    orders,
    updateOrderStatus,
  };
}
