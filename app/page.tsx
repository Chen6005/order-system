"use client";

import { useRef, useState } from "react";

import { CartSummary } from "@/components/CartSummary";
import { MenuCategorySection } from "@/components/MenuCategorySection";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useOrderSystem } from "@/hooks/useOrderSystem";
import type { MenuCategory, Season } from "@/lib/types";

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

const seasonalEntries: { label: string; season: Season; subtitle: string }[] = [
  { label: "春季養生", season: "spring", subtitle: "舒展養氣" },
  { label: "夏季清潤", season: "summer", subtitle: "清潤解暑" },
  { label: "秋季滋補", season: "autumn", subtitle: "潤燥養陰" },
  { label: "冬季暖身", season: "winter", subtitle: "溫補暖胃" },
];

const seasonalSectionContent: Record<
  Season,
  {
    title: string;
    description: string;
    icon: string;
    containerClass: string;
    titleClass: string;
    descriptionClass: string;
  }
> = {
  spring: {
    title: "春季養生",
    description: "舒展養氣，適合換季調理",
    icon: "🌿",
    containerClass: "border-[#b8d9b0] bg-[#f2fbef]",
    titleClass: "text-[#2f5f3e]",
    descriptionClass: "text-[#4f7659]",
  },
  summer: {
    title: "夏季清潤",
    description: "清潤解暑，減少燥熱負擔",
    icon: "💧",
    containerClass: "border-[#b8d8ef] bg-[#eef8ff]",
    titleClass: "text-[#245577]",
    descriptionClass: "text-[#3d6f8e]",
  },
  autumn: {
    title: "秋季滋補",
    description: "潤燥養身，溫和調理日常",
    icon: "🍂",
    containerClass: "border-[#e2c48f] bg-[#fff6ea]",
    titleClass: "text-[#79572d]",
    descriptionClass: "text-[#946d3d]",
  },
  winter: {
    title: "冬季暖身",
    description: "暖胃補氣，適合寒冷季節",
    icon: "🔥",
    containerClass: "border-[#d8c8b4] bg-[#fbf5ee]",
    titleClass: "text-[#634732]",
    descriptionClass: "text-[#7c5f46]",
  },
  allYear: {
    title: "四季皆宜",
    description: "溫和平衡，日常都能安心享用",
    icon: "🌿",
    containerClass: "border-[#d6bc82] bg-[#fffaf0]",
    titleClass: "text-[#234336]",
    descriptionClass: "text-[#7a5a2f]",
  },
};

export default function Home() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonFilter>("all");
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const menuSectionRef = useRef<HTMLDivElement | null>(null);
  const { isLoading: isMenuLoading, menuError, menuItems } = useMenuItems();
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

  const availableMenuItems = menuItems.filter(
    (item) => item.available && !item.archived,
  );
  const recommendedItems = availableMenuItems
    .filter((item) => item.season === "autumn" || item.season === "allYear")
    .slice(0, 3);
  const filteredMenuItems =
    selectedSeason === "all"
      ? availableMenuItems
      : availableMenuItems.filter((item) => item.season === selectedSeason);

  const handleSeasonEntryClick = (season: Season) => {
    setSelectedSeason(season);
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#f8f3ea] px-6 pb-28 pt-10 text-[#2f251d] sm:px-10 sm:pb-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="border-b border-[#d9c7a8] pb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#7a5a2f]">廣東養生堂</p>
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

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[#234336]">四季養生入口</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {seasonalEntries.map((entry) => (
              <button
                className="rounded-md border border-[#d6bc82] bg-[#fffaf0] px-4 py-4 text-left transition hover:border-[#b69258] hover:bg-[#f6ecd9]"
                key={entry.season}
                onClick={() => handleSeasonEntryClick(entry.season)}
                type="button"
              >
                <p className="text-base font-semibold text-[#234336]">{entry.label}</p>
                <p className="mt-1 text-sm text-[#7a5a2f]">{entry.subtitle}</p>
              </button>
            ))}
          </div>
        </section>

        <div className="hidden sm:block">
          <CartSummary
            cartItems={cartItems}
            checkoutSuccess={checkoutSuccess}
            onCheckout={checkout}
            onDecrease={decreaseQuantity}
            onIncrease={increaseQuantity}
            orderError={orderError}
            total={cartTotal}
          />
        </div>

        <div className="flex flex-col gap-8" ref={menuSectionRef}>
          {isMenuLoading ? (
            <section className="rounded-lg border border-[#d9c7a8] bg-[#fffaf0] p-5 text-sm font-medium text-[#6c5b49] shadow-sm">
              菜單載入中...
            </section>
          ) : menuError ? (
            <section className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700 shadow-sm">
              菜單讀取失敗
            </section>
          ) : (
            <>
              {selectedSeason !== "all" ? (
                <section
                  className={`rounded-lg border px-5 py-4 shadow-sm ${seasonalSectionContent[selectedSeason].containerClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg leading-none" role="img">
                      {seasonalSectionContent[selectedSeason].icon}
                    </span>
                    <div>
                      <p
                        className={`text-base font-semibold ${seasonalSectionContent[selectedSeason].titleClass}`}
                      >
                        {seasonalSectionContent[selectedSeason].title}
                      </p>
                      <p
                        className={`mt-1 text-sm ${seasonalSectionContent[selectedSeason].descriptionClass}`}
                      >
                        {seasonalSectionContent[selectedSeason].description}
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}

              <section className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[#234336]">菜單區</h2>
                {selectedSeason !== "all" ? (
                  <button
                    className="rounded-full border border-[#d6bc82] bg-[#fffaf0] px-4 py-2 text-sm font-medium text-[#7a5a2f] transition hover:bg-[#efe4d0]"
                    onClick={() => setSelectedSeason("all")}
                    type="button"
                  >
                    顯示全部湯水
                  </button>
                ) : null}
              </section>

              <MenuCategorySection
                cartItems={cartItems}
                items={recommendedItems}
                onAddToCart={addToCart}
                onDecreaseQuantity={decreaseQuantity}
                onIncreaseQuantity={increaseQuantity}
                title="本季推薦"
              />

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
                      cartItems={cartItems}
                      items={categoryItems}
                      key={category}
                      onAddToCart={addToCart}
                      onDecreaseQuantity={decreaseQuantity}
                      onIncreaseQuantity={increaseQuantity}
                      title={categoryLabels[category]}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {cartItems.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d6bc82] bg-[#fffaf0]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-8px_24px_rgba(35,67,54,0.12)] backdrop-blur sm:hidden">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#234336]">🛒 {cartCount} 件商品</p>
              <p className="text-sm text-[#7a5a2f]">總金額 NT$ {cartTotal}</p>
            </div>
            <button
              className="rounded-full bg-[#234336] px-5 py-3 text-sm font-semibold text-[#fffaf0] transition active:scale-[0.98]"
              onClick={() => setIsMobileCartOpen(true)}
              type="button"
            >
              查看購物車
            </button>
          </div>
        </div>
      ) : null}

      {cartItems.length > 0 ? (
        <div
          aria-hidden={!isMobileCartOpen}
          className={`fixed inset-0 z-50 transition sm:hidden ${
            isMobileCartOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <button
            aria-label="關閉購物車"
            className={`absolute inset-0 bg-[#2f251d]/45 transition-opacity ${
              isMobileCartOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMobileCartOpen(false)}
            type="button"
          />
          <section
            className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-[#d6bc82] bg-[#fffaf0] px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 shadow-2xl transition-transform duration-300 ${
              isMobileCartOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#234336]">購物車</h2>
              <button
                className="rounded-full border border-[#d6bc82] px-3 py-2 text-sm font-medium text-[#7a5a2f]"
                onClick={() => setIsMobileCartOpen(false)}
                type="button"
              >
                關閉
              </button>
            </div>
            <CartSummary
              cartItems={cartItems}
              checkoutSuccess={checkoutSuccess}
              onCheckout={checkout}
              onDecrease={decreaseQuantity}
              onIncrease={increaseQuantity}
              orderError={orderError}
              total={cartTotal}
            />
          </section>
        </div>
      ) : null}
    </main>
  );
}
