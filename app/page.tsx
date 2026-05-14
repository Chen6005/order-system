"use client";

import { CartSummary } from "@/components/CartSummary";
import { MenuCategorySection } from "@/components/MenuCategorySection";
import { useOrderSystem } from "@/hooks/useOrderSystem";
import { menuItems } from "@/lib/mock-data";
import type { MenuCategory } from "@/lib/types";

const availableMenuItems = menuItems.filter((item) => item.available);
const categoryOrder: MenuCategory[] = ["pasta", "pizza", "drink", "dessert"];
const categoryLabels: Record<MenuCategory, string> = {
  pasta: "義大利麵",
  pizza: "披薩",
  drink: "飲品",
  dessert: "甜點",
};

export default function Home() {
  const {
    addToCart,
    cartCount,
    cartItems,
    cartTotal,
    checkout,
    checkoutSuccess,
    decreaseQuantity,
    increaseQuantity,
    orderError,
  } = useOrderSystem(false);

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              點餐系統
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">
              今日菜單
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-600">
              瀏覽目前供應的餐點，選擇你想要的品項。
            </p>
          </div>
          <div className="rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm">
            購物車 ({cartCount})
          </div>
        </header>

        <CartSummary
          cartItems={cartItems}
          checkoutSuccess={checkoutSuccess}
          onCheckout={checkout}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
          orderError={orderError}
          total={cartTotal}
        />

        <div className="flex flex-col gap-8">
          {categoryOrder.map((category) => {
            const categoryItems = availableMenuItems.filter(
              (item) => item.category === category,
            );

            if (categoryItems.length === 0) {
              return null;
            }

            return (
              <MenuCategorySection
                items={categoryItems}
                key={category}
                onAddToCart={addToCart}
                title={categoryLabels[category]}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
