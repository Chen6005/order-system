import type { MenuItem } from "@/lib/types";

type MenuItemCardProps = {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
};

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <article className="flex min-h-48 flex-col justify-between rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-stone-950">{item.name}</h2>
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
          onClick={() => onAddToCart(item)}
          type="button"
        >
          加入購物車
        </button>
      </div>
    </article>
  );
}
