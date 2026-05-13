"use client";

import { useState } from "react";

import { menuItems } from "@/lib/mock-data";
import type { CartItem } from "@/lib/types";

const availableMenuItems = menuItems.filter((item) => item.available);

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function handleAddToCart(menuItem: (typeof menuItems)[number]) {
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

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-stone-950">
              Cart Summary
            </h2>
            <p className="text-sm font-medium text-stone-500">
              {cartCount} item{cartCount === 1 ? "" : "s"}
            </p>
          </div>

          {cartItems.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">Your cart is empty.</p>
          ) : (
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                {cartItems.map((item) => (
                  <div
                    className="grid gap-2 border-b border-stone-100 pb-3 text-sm last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
                    key={item.menuItemId}
                  >
                    <p className="font-medium text-stone-950">{item.name}</p>
                    <p className="text-stone-600">Qty {item.quantity}</p>
                    <p className="text-stone-600">NT${item.price}</p>
                    <p className="font-semibold text-stone-950">
                      NT${item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                <p className="text-sm font-medium text-stone-600">Total</p>
                <p className="text-lg font-semibold text-emerald-700">
                  NT${cartTotal}
                </p>
              </div>
            </div>
          )}
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableMenuItems.map((item) => (
            <article
              className="flex min-h-48 flex-col justify-between rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
              key={item.id}
            >
              <div>
                <h2 className="text-xl font-semibold text-stone-950">
                  {item.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-lg font-semibold text-emerald-700">
                  NT${item.price}
                </p>
                <button
                  className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                  onClick={() => handleAddToCart(item)}
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
