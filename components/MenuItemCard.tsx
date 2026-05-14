import type { MenuItem } from "@/lib/types";

type MenuItemCardProps = {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
};

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <article className="flex min-h-56 flex-col justify-between rounded-lg border border-[#ddc9a5] bg-[#fffaf2] p-5 shadow-sm">
      <div>
        <div className="mb-4 h-1 w-12 rounded-full bg-[#c8a45d]" />
        <h2 className="text-xl font-semibold text-[#2f251d]">{item.name}</h2>
        <p className="mt-3 text-sm leading-6 text-[#6c5b49]">
          {item.description}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-lg font-semibold text-[#234336]">
          NT${item.price}
        </p>
        <button
          className="rounded-full bg-[#234336] px-4 py-2 text-sm font-medium text-[#fffaf0] transition-colors hover:bg-[#1b342a]"
          onClick={() => onAddToCart(item)}
          type="button"
        >
          加入購物車
        </button>
      </div>
    </article>
  );
}
