import { useState } from "react";

import type { CartItem, MenuItem, Order, OrderStatus } from "@/lib/types";

export function useOrderSystem() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function addToCart(menuItem: MenuItem) {
    setCheckoutSuccess(false);
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

  function checkout() {
    if (cartItems.length === 0) {
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      items: cartItems,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [...currentOrders, newOrder]);
    setCheckoutSuccess(true);
    setCartItems([]);
  }

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
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
    orders,
    updateOrderStatus,
  };
}
