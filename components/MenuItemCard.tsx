import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import type { MenuItem } from "@/lib/types";

type MenuItemCardProps = {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  quantityInCart: number;
  onIncrease: (menuItemId: string) => void;
  onDecrease: (menuItemId: string) => void;
};

const seasonLabels: Record<MenuItem["season"], string> = {
  spring: "春季",
  summer: "夏季",
  autumn: "秋季",
  winter: "冬季",
  allYear: "四季皆宜",
};

export function MenuItemCard({
  item,
  onAddToCart,
  quantityInCart,
  onIncrease,
  onDecrease,
}: MenuItemCardProps) {
  const [isQuantityAnimating, setIsQuantityAnimating] = useState(false);
  const previousQuantityRef = useRef(quantityInCart);

  useEffect(() => {
    if (quantityInCart !== previousQuantityRef.current) {
      setIsQuantityAnimating(true);
      const timer = setTimeout(() => setIsQuantityAnimating(false), 180);
      previousQuantityRef.current = quantityInCart;
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [quantityInCart]);

  return (
    <article className="flex min-h-96 flex-col justify-between overflow-hidden rounded-lg border border-[#ddc9a5] bg-[#fffaf2] shadow-sm">
      <div>
        <div className="relative aspect-[4/3] border-b border-[#ead8b8] bg-[#efe4d0]">
          <Image
            alt={item.name}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            src={item.imageUrl}
          />
        </div>
        <div className="p-5">
          <div className="mb-4 h-1 w-12 rounded-full bg-[#c8a45d]" />
          <span className="mb-3 inline-flex rounded-full border border-[#d6bc82] bg-[#f8f3ea] px-3 py-1 text-xs font-medium text-[#7a5a2f]">
            {seasonLabels[item.season]}
          </span>
          <h2 className="text-xl font-semibold text-[#2f251d]">{item.name}</h2>
          <p className="mt-3 text-sm leading-6 text-[#6c5b49]">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 pb-5">
        <p className="text-lg font-semibold text-[#234336]">
          NT${item.price}
        </p>
        {quantityInCart > 0 ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6bc82] bg-[#fffaf0] p-1">
            <button
              aria-label={`減少 ${item.name} 數量`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6bc82] text-lg font-semibold text-[#234336] transition duration-150 hover:bg-[#efe4d0] active:scale-[0.95]"
              onClick={() => onDecrease(item.id)}
              type="button"
            >
              -
            </button>
            <span
              className={`min-w-8 text-center text-base font-semibold text-[#234336] ${isQuantityAnimating ? "cart-qty-fade" : ""}`}
            >
              {quantityInCart}
            </span>
            <button
              aria-label={`增加 ${item.name} 數量`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#234336] text-lg font-semibold text-[#fffaf0] transition duration-150 hover:bg-[#1b342a] active:scale-[0.95]"
              onClick={() => onIncrease(item.id)}
              type="button"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="rounded-full bg-[#234336] px-4 py-2.5 text-sm font-medium text-[#fffaf0] transition duration-150 hover:bg-[#1b342a] active:scale-[0.95]"
            onClick={() => onAddToCart(item)}
            type="button"
          >
            加入購物車
          </button>
        )}
      </div>
    </article>
  );
}
