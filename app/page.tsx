"use client";

import { useState } from "react";

import { CartSummary } from "@/components/CartSummary";
import { MenuCategorySection } from "@/components/MenuCategorySection";
import { useOrderSystem } from "@/hooks/useOrderSystem";
import { menuItems } from "@/lib/mock-data";
import type { MenuCategory, Season } from "@/lib/types";

const availableMenuItems = menuItems.filter((item) => item.available);
type SeasonFilter = Season | "all";

const categoryOrder: MenuCategory[] = [
  "seasonalSoup",
  "herbalSoup",
  "dessertSoup",
  "teaDrink",
];
const categoryLabels: Record<MenuCategory, string> = {
  seasonalSoup: "四季湯水",
  herbalSoup: "養生燉湯",
  dessertSoup: "養生糖水",
  teaDrink: "養生茶飲",
};
const seasonFilters: { label: string; value: SeasonFilter }[] = [
  { label: "全部", value: "all" },
  { label: "春季", value: "spring" },
  { label: "夏季", value: "summer" },
  { label: "秋季", value: "autumn" },
  { label: "冬季", value: "winter" },
  { label: "四季皆宜", value: "allYear" },
];

export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonFilter>("all");
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
  const filteredMenuItems =
    selectedSeason === "all"
      ? availableMenuItems
      : availableMenuItems.filter((item) => item.season === selectedSeason);

  return (
    <main className="min-h-screen bg-[#f8f3ea] px-6 py-10 text-[#2f251d] sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="border-b border-[#d9c7a8] pb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#7a5a2f]">
                廣東養生堂
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-[#234336] sm:text-5xl">
                四季湯水・養生糖水
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#6c5b49]">
                依時令調養身心，慢火熬出一碗溫潤日常。
              </p>
            </div>
            <div className="rounded-full border border-[#d6bc82] bg-[#fffaf0] px-5 py-2 text-sm font-semibold text-[#234336] shadow-sm">
              購物車 ({cartCount})
            </div>
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

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[#234336]">依季節篩選</h2>
          <div className="flex flex-wrap gap-2">
            {seasonFilters.map((filter) => {
              const isSelected = selectedSeason === filter.value;

              return (
                <button
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-[#234336] bg-[#234336] text-[#fffaf0]"
                      : "border-[#d6bc82] bg-[#fffaf0] text-[#7a5a2f] hover:bg-[#efe4d0]"
                  }`}
                  key={filter.value}
                  onClick={() => setSelectedSeason(filter.value)}
                  type="button"
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col gap-8">
          {categoryOrder.map((category) => {
            const categoryItems = filteredMenuItems.filter(
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
