"use client";

import { useState } from "react";

import { CartSummary } from "@/components/CartSummary";
import { MenuItemCard } from "@/components/MenuItemCard";
import { menuItems } from "@/lib/mock-data";
import type { CartItem, MenuItem, Order } from "@/lib/types";

const availableMenuItems = menuItems.filter((item) => item.available);

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function handleAddToCart(menuItem: MenuItem) {
    setOrderSubmitted(false);
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

  function increaseCartItem(menuItemId: string) {
    setOrderSubmitted(false);
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.menuItemId === menuItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseCartItem(menuItemId: string) {
    setOrderSubmitted(false);
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

  function handleCheckout() {
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
    setOrderSubmitted(true);
    setCartItems([]);
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              Order System
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">
              Today&apos;s Menu
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-600">
              Browse the available dishes and choose what you would like to
              order.
            </p>
          </div>
          <div className="rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm">
            Cart ({cartCount})
          </div>
        </header>

        <CartSummary
          cartItems={cartItems}
          checkoutSuccess={orderSubmitted}
          onCheckout={handleCheckout}
          onDecrease={decreaseCartItem}
          onIncrease={increaseCartItem}
          total={cartTotal}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableMenuItems.map((item) => (
            <MenuItemCard
              item={item}
              key={item.id}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              Admin
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-950">
              Orders
            </h2>
          </div>

          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">No orders yet.</p>
          ) : (
            <div className="mt-5 flex flex-col gap-3">
              {orders.map((order) => (
                <article
                  className="grid gap-2 rounded-md border border-stone-100 bg-stone-50 p-4 text-sm sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
                  key={order.id}
                >
                  <p className="font-medium text-stone-950">
                    Order #{order.id}
                  </p>
                  <p className="text-stone-600">Status: {order.status}</p>
                  <p className="text-stone-600">
                    Items: {order.items.length}
                  </p>
                  <p className="text-stone-600">{order.createdAt}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
