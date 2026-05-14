import { MenuItemCard } from "@/components/MenuItemCard";
import type { MenuItem } from "@/lib/types";

type MenuCategorySectionProps = {
  title: string;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
};

export function MenuCategorySection({
  title,
  items,
  onAddToCart,
}: MenuCategorySectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-stone-950">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard
            item={item}
            key={item.id}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
